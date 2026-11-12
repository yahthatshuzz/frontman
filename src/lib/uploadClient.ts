/** Browser helper: PUT a file to the URL the server issued, with progress. Retries twice on network errors. */
export function putFile(target: { url: string; headers: Record<string, string> }, file: Blob, onProgress?: (share: number) => void): Promise<void> {
  const once = () =>
    new Promise<void>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("PUT", target.url);
      for (const [k, v] of Object.entries(target.headers)) xhr.setRequestHeader(k, v);
      xhr.upload.onprogress = (e) => e.lengthComputable && onProgress?.(e.loaded / e.total);
      xhr.onload = () => (xhr.status >= 200 && xhr.status < 300 ? resolve() : reject(new Error(uploadError(xhr.status, xhr.responseText))));
      xhr.onerror = () => reject(new Error("network"));
      xhr.send(file);
    });
  return (async () => {
    for (let attempt = 0; ; attempt++) {
      try {
        return await once();
      } catch (e) {
        if (!(e instanceof Error && e.message === "network") || attempt >= 2) {
          throw e instanceof Error && e.message === "network" ? new Error("The connection dropped during the upload. Check your signal and tap Send again.") : e;
        }
        await new Promise((r) => setTimeout(r, 1500 * (attempt + 1)));
      }
    }
  })();
}

function uploadError(status: number, body: string): string {
  if (status === 413 || /exceeded the maximum allowed size/i.test(body)) return "That video is too big to upload. Record a shorter take or export at 1080p.";
  if (status === 400 && /mime/i.test(body)) return "That file type isn't supported. Upload an MP4 or MOV.";
  return `The upload failed (${status}). Try again.`;
}

/** Duration of a video file in seconds, read in the browser. 0 if it can't be read. */
export function videoSeconds(file: Blob): Promise<number> {
  return new Promise((resolve) => {
    const v = document.createElement("video");
    v.preload = "metadata";
    const url = URL.createObjectURL(file);
    const done = (n: number) => {
      URL.revokeObjectURL(url);
      resolve(Number.isFinite(n) ? n : 0);
    };
    v.onloadedmetadata = () => done(v.duration);
    v.onerror = () => done(0);
    v.src = url;
    setTimeout(() => done(0), 4000);
  });
}
