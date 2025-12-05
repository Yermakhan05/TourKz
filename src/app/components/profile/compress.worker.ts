addEventListener('message', async ({ data }) => {
    const file: File = data;

    const imageBitmap = await createImageBitmap(file);

    const canvas = new OffscreenCanvas(imageBitmap.width, imageBitmap.height);
    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(imageBitmap, 0, 0);

    // конвертируем в Blob с качеством 0.7
    const blob = await canvas.convertToBlob({
        type: 'image/jpeg',
        quality: 0.7,
    });

    postMessage(blob);
});