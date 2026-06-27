/* eslint-disable @next/next/no-img-element */
"use client";

import { ChangeEvent, DragEvent, useEffect, useMemo, useRef, useState } from "react";
import { createSupabaseClient } from "@/lib/supabase";

type MediaAsset = {
  id: string;
  name: string;
  storage_path: string;
  public_url: string;
  media_type: "image" | "video";
  mime_type: string;
  size_bytes: number;
  folder: string;
  thumbnail_url?: string | null;
  uploaded_by?: string | null;
  used_by?: string[];
  created_at: string;
};

const folders = ["Hero", "Produk", "Kategori", "Store", "Logo", "Galeri", "Video"];
const imageTypes = ["image/jpeg", "image/png", "image/webp"];
const videoTypes = ["video/mp4", "video/webm", "video/quicktime"];
const MB = 1024 * 1024;

function readableSize(bytes: number) {
  if (bytes >= MB) return `${(bytes / MB).toFixed(1)} MB`;
  if (bytes >= 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${bytes} B`;
}

function safeFileName(name: string) {
  const parts = name.toLowerCase().split(".");
  const extension = parts.length > 1 ? `.${parts.pop()}` : "";
  const base = parts.join(".").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "asset";
  return `${base}${extension}`;
}

function validateFile(file: File) {
  const isImage = imageTypes.includes(file.type);
  const isVideo = videoTypes.includes(file.type);
  if (!isImage && !isVideo) return "Format tidak didukung. Gunakan JPG, PNG, WebP, MP4, WebM, atau MOV.";
  if (isImage && file.size > 10 * MB) return `${file.name} melebihi batas foto 10 MB.`;
  if (isVideo && file.size > 100 * MB) return `${file.name} melebihi batas video 100 MB.`;
  return "";
}

async function optimizeImage(file: File) {
  if (!imageTypes.includes(file.type)) return file;
  try {
    const bitmap = await createImageBitmap(file);
    const maxSide = 2400;
    const scale = Math.min(1, maxSide / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(bitmap.width * scale));
    canvas.height = Math.max(1, Math.round(bitmap.height * scale));
    canvas.getContext("2d")?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close();
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/webp", 0.86));
    if (!blob || blob.size >= file.size) return file;
    return new File([blob], file.name.replace(/\.[^.]+$/, "") + ".webp", { type: "image/webp" });
  } catch {
    return file;
  }
}

async function createVideoThumbnail(file: File) {
  return new Promise<Blob | null>((resolve) => {
    const video = document.createElement("video");
    const url = URL.createObjectURL(file);
    const finish = (blob: Blob | null) => {
      URL.revokeObjectURL(url);
      resolve(blob);
    };
    video.muted = true;
    video.preload = "metadata";
    video.src = url;
    video.onloadeddata = () => {
      video.currentTime = Math.min(0.2, Math.max(0, video.duration / 3));
    };
    video.onseeked = () => {
      const canvas = document.createElement("canvas");
      const scale = Math.min(1, 640 / Math.max(video.videoWidth, video.videoHeight));
      canvas.width = Math.max(1, Math.round(video.videoWidth * scale));
      canvas.height = Math.max(1, Math.round(video.videoHeight * scale));
      canvas.getContext("2d")?.drawImage(video, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(finish, "image/jpeg", 0.78);
    };
    video.onerror = () => finish(null);
  });
}

export function MediaLibraryPanel() {
  const [assets, setAssets] = useState<MediaAsset[]>([]);
  const [folder, setFolder] = useState("Galeri");
  const [folderFilter, setFolderFilter] = useState("Semua");
  const [typeFilter, setTypeFilter] = useState("Semua");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function loadAssets() {
    const supabase = createSupabaseClient();
    if (!supabase) return;
    const { data, error } = await supabase.from("media_assets").select("*").order("created_at", { ascending: false });
    if (error) {
      setStatus("Media Library belum siap. Jalankan schema Supabase terbaru.");
      return;
    }
    setAssets((data || []) as MediaAsset[]);
  }

  useEffect(() => {
    loadAssets();
  }, []);

  const visibleAssets = useMemo(() => assets.filter((asset) => {
    const matchesQuery = asset.name.toLowerCase().includes(query.trim().toLowerCase());
    const matchesFolder = folderFilter === "Semua" || asset.folder === folderFilter;
    const matchesType = typeFilter === "Semua" || asset.media_type === typeFilter;
    return matchesQuery && matchesFolder && matchesType;
  }), [assets, folderFilter, query, typeFilter]);

  async function uploadFiles(fileList: FileList | File[]) {
    const files = Array.from(fileList);
    if (!files.length) return;
    if (files.length > 20) {
      setStatus("Maksimal 20 file dalam satu kali upload.");
      return;
    }
    const invalid = files.map(validateFile).find(Boolean);
    if (invalid) {
      setStatus(invalid);
      return;
    }

    const supabase = createSupabaseClient();
    if (!supabase) return;
    const { data: sessionData } = await supabase.auth.getSession();
    setUploading(true);
    setProgress(0);
    setStatus("Menyiapkan upload...");

    for (let index = 0; index < files.length; index += 1) {
      const originalFile = files[index];
      const file = await optimizeImage(originalFile);
      const mediaType = imageTypes.includes(file.type) ? "image" : "video";
      const storageFolder = mediaType === "video" && folder === "Galeri" ? "Video" : folder;
      const path = `${storageFolder.toLowerCase()}/${Date.now()}-${index}-${safeFileName(file.name)}`;
      const { error: uploadError } = await supabase.storage.from("public-assets").upload(path, file, {
        cacheControl: "31536000",
        contentType: file.type,
        upsert: false
      });

      if (uploadError) {
        setStatus(`Upload ${file.name} gagal. Periksa koneksi lalu coba lagi.`);
        setUploading(false);
        return;
      }

      const { data: publicData } = supabase.storage.from("public-assets").getPublicUrl(path);
      let thumbnailUrl: string | null = null;
      if (mediaType === "video") {
        const thumbnail = await createVideoThumbnail(file);
        if (thumbnail) {
          const thumbnailPath = path.replace(/\.[^.]+$/, "-thumbnail.jpg");
          const { error: thumbnailError } = await supabase.storage.from("public-assets").upload(thumbnailPath, thumbnail, {
            cacheControl: "31536000",
            contentType: "image/jpeg",
            upsert: true
          });
          if (!thumbnailError) thumbnailUrl = supabase.storage.from("public-assets").getPublicUrl(thumbnailPath).data.publicUrl;
        }
      }
      const { error: insertError } = await supabase.from("media_assets").insert({
        name: originalFile.name,
        storage_path: path,
        public_url: publicData.publicUrl,
        media_type: mediaType,
        mime_type: file.type,
        size_bytes: file.size,
        folder: storageFolder,
        thumbnail_url: thumbnailUrl,
        uploaded_by: sessionData.session?.user.id || null
      });

      if (insertError) {
        await supabase.storage.from("public-assets").remove([path]);
        setStatus(`File ${file.name} terunggah, tetapi pencatatan media gagal.`);
        setUploading(false);
        return;
      }
      setProgress(Math.round(((index + 1) / files.length) * 100));
    }

    setUploading(false);
    setStatus(`${files.length} file berhasil ditambahkan.`);
    if (inputRef.current) inputRef.current.value = "";
    loadAssets();
  }

  async function replaceAsset(asset: MediaAsset, event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const errorMessage = validateFile(file);
    if (errorMessage) {
      setStatus(errorMessage);
      return;
    }
    const supabase = createSupabaseClient();
    if (!supabase) return;
    setStatus(`Mengganti ${asset.name}...`);
    const { error } = await supabase.storage.from("public-assets").upload(asset.storage_path, file, {
      contentType: file.type,
      cacheControl: "31536000",
      upsert: true
    });
    if (error) {
      setStatus("Replace media gagal. File lama tetap aman.");
      return;
    }
    await supabase.from("media_assets").update({
      name: file.name,
      mime_type: file.type,
      media_type: imageTypes.includes(file.type) ? "image" : "video",
      size_bytes: file.size,
      updated_at: new Date().toISOString()
    }).eq("id", asset.id);
    setStatus("Media berhasil diganti tanpa mengubah URL pemakaiannya.");
    loadAssets();
  }

  async function deleteAsset(asset: MediaAsset) {
    const usages = asset.used_by || [];
    const warning = usages.length
      ? `Media ini sedang digunakan di ${usages.join(", ")}. Tetap hapus?`
      : "Hapus media ini secara permanen?";
    if (!window.confirm(warning)) return;
    const supabase = createSupabaseClient();
    if (!supabase) return;
    const { error: storageError } = await supabase.storage.from("public-assets").remove([asset.storage_path]);
    if (storageError) {
      setStatus("Media belum dapat dihapus dari penyimpanan.");
      return;
    }
    await supabase.from("media_assets").delete().eq("id", asset.id);
    setStatus("Media dihapus.");
    loadAssets();
  }

  async function copyUrl(url: string) {
    await navigator.clipboard.writeText(url);
    setStatus("URL media disalin. Tempelkan pada field gambar atau video.");
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    uploadFiles(event.dataTransfer.files);
  }

  return (
    <div className="mt-6 grid gap-5">
      <div onDragOver={(event) => event.preventDefault()} onDrop={handleDrop} className="border border-dashed border-brand-green/40 bg-white p-6 text-center sm:p-8">
        <p className="text-lg font-semibold">Tarik foto atau video ke sini</p>
        <p className="mt-2 text-sm leading-6 text-brand-charcoal/60">JPG, PNG, WebP maksimal 10 MB · MP4, WebM, MOV maksimal 100 MB · hingga 20 file</p>
        <div className="mx-auto mt-5 flex max-w-md flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
          <select value={folder} onChange={(event) => setFolder(event.target.value)} className="min-h-11 border border-brand-softGray bg-white px-4 text-sm font-semibold">
            {folders.map((item) => <option key={item}>{item}</option>)}
          </select>
          <label className="inline-flex min-h-11 cursor-pointer items-center justify-center rounded-full bg-brand-green px-6 text-sm font-semibold text-white">
            {uploading ? "Mengupload..." : "Pilih File"}
            <input ref={inputRef} type="file" multiple accept="image/jpeg,image/png,image/webp,video/mp4,video/webm,video/quicktime,.mov" className="sr-only" disabled={uploading} onChange={(event) => event.target.files && uploadFiles(event.target.files)} />
          </label>
        </div>
        {uploading || progress > 0 ? <div className="mx-auto mt-5 h-2 max-w-md overflow-hidden rounded-full bg-brand-softGray"><div className="h-full bg-brand-green transition-all" style={{ width: `${progress}%` }} /></div> : null}
      </div>

      {status ? <p role="status" className="border border-brand-softGray bg-white p-4 text-sm font-semibold">{status}</p> : null}

      <div className="grid gap-3 bg-white p-4 md:grid-cols-[1fr_auto_auto]">
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari nama file..." className="min-h-11 border border-brand-softGray px-4 text-sm outline-none focus:border-brand-green" />
        <select value={folderFilter} onChange={(event) => setFolderFilter(event.target.value)} className="min-h-11 border border-brand-softGray bg-white px-4 text-sm font-semibold"><option>Semua</option>{folders.map((item) => <option key={item}>{item}</option>)}</select>
        <select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)} className="min-h-11 border border-brand-softGray bg-white px-4 text-sm font-semibold"><option value="Semua">Semua tipe</option><option value="image">Foto</option><option value="video">Video</option></select>
      </div>

      {visibleAssets.length ? (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
          {visibleAssets.map((asset) => (
            <article key={asset.id} className="border border-brand-softGray bg-white p-3">
              {asset.media_type === "video" ? <video src={asset.public_url} muted playsInline preload="metadata" controls className="aspect-square w-full bg-brand-offWhite object-cover" /> : <img src={asset.public_url} alt={asset.name} loading="lazy" className="aspect-square w-full bg-brand-offWhite object-cover" />}
              <h3 className="mt-3 truncate text-sm font-semibold" title={asset.name}>{asset.name}</h3>
              <p className="mt-1 text-xs text-brand-charcoal/55">{asset.folder} · {readableSize(asset.size_bytes)}</p>
              <p className="mt-1 text-xs text-brand-charcoal/55">{new Intl.DateTimeFormat("id-ID", { dateStyle: "medium" }).format(new Date(asset.created_at))}</p>
              {asset.used_by?.length ? <p className="mt-2 text-xs font-semibold text-brand-green">Dipakai: {asset.used_by.join(", ")}</p> : <p className="mt-2 text-xs text-brand-charcoal/45">Belum digunakan</p>}
              <div className="mt-3 flex flex-wrap gap-2">
                <button type="button" onClick={() => copyUrl(asset.public_url)} className="rounded-full border border-brand-softGray px-3 py-2 text-xs font-semibold hover:border-brand-green">Salin URL</button>
                <label className="cursor-pointer rounded-full border border-brand-softGray px-3 py-2 text-xs font-semibold hover:border-brand-green">Replace<input type="file" className="sr-only" accept="image/jpeg,image/png,image/webp,video/mp4,video/webm,video/quicktime,.mov" onChange={(event) => replaceAsset(asset, event)} /></label>
                <button type="button" onClick={() => deleteAsset(asset)} className="rounded-full px-3 py-2 text-xs font-semibold text-red-700 hover:bg-red-50">Hapus</button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="bg-white p-8 text-center"><p className="text-lg font-semibold">Belum ada media</p><p className="mt-2 text-sm text-brand-charcoal/60">Upload file pertama atau ubah filter pencarian.</p></div>
      )}
    </div>
  );
}
