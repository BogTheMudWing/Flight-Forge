import { notifications } from "@mantine/notifications";

export async function exportImage(layers: HTMLCollection, name: string, gradientStart: string, gradientEnd: string) {

  let canvas: HTMLCanvasElement = document.createElement("canvas");
  let context: CanvasRenderingContext2D | null = canvas.getContext('2d');
  if (context == null) {
    notifications.show({
      color: 'red',
      withBorder: true,
      title: 'There was a problem exporting the image.',
      message: 'Context for canvas is null.',
    });
    return;
  }
  context.canvas.width = 512;
  context.canvas.height = 512;

  for (let i = 0; i < layers.length; i++) {
    let layer = layers[i];
    if (layer instanceof HTMLImageElement) {
      const img = new Image();
      img.src = layer.src;
      await img.decode(); // Wait for image to load

      if (layer.style.filter) {
        context.save();
        context.filter = layer.style.filter;
      }

      context.drawImage(img, 0, 0);

      if (layer.style.filter) {
        context.restore();
      }
    } else if (layer instanceof HTMLDivElement) {
      console.log("Rendering div")
      // Handle <div> layers with background-color and mask-image
      const style = getComputedStyle(layer);

      const background = style.background;
      console.log("bgColor: " + background)
      const maskImage = style.maskImage || style.webkitMaskImage;
      console.log("maskImage: " + maskImage)

      // Draw background color only if it's not transparent
      if (background && background !== 'rgba(0, 0, 0, 0)' && background !== 'transparent') {
        // If there's a mask, we need to apply it manually
        if (maskImage && maskImage !== 'none') {
          const match = maskImage.match(/url\(["']?(.*?)["']?\)/);
          if (match) {
            const maskSrc = match[1];
            const maskImg = new Image();
            maskImg.src = maskSrc;
            await maskImg.decode();

            // Create temp canvas to apply mask
            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = canvas.width;
            tempCanvas.height = canvas.height;
            const tempCtx = tempCanvas.getContext('2d');
            if (tempCtx == null) {
              notifications.show({
                color: 'red',
                withBorder: true,
                title: 'There was a problem exporting the image.',
                message: 'Context for temporary canvas is null.',
              });
              return;
            }

            layer.style.background

            const gradient = tempCtx.createLinearGradient(0, 0, 0, canvas.height);
            gradient.addColorStop(0, gradientStart);
            gradient.addColorStop(1, gradientEnd);

            tempCtx.fillStyle = gradient;
            tempCtx.fillRect(0, 0, canvas.width, canvas.height);

            // Set composite mode to apply mask
            tempCtx.globalCompositeOperation = 'destination-in';
            tempCtx.drawImage(maskImg, 0, 0);

            // Draw masked layer to main canvas
            context.drawImage(tempCanvas, 0, 0);
          }
        } else {
          // No mask, just fill rect
          context.fillStyle = background;
          context.fillRect(0, 0, canvas.width, canvas.height);
        }
      }
    }
  }

  let link: HTMLAnchorElement = document.createElement("a");
  link.download = name;
  link.href = canvas.toDataURL('image/png');
  link.click();
}