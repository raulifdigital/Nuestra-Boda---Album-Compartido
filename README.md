
# 💍 Boda Rocío & Matías - Álbum Compartido

Este es el repositorio oficial de los recuerdos de nuestra boda. Los invitados pueden subir fotos y videos que se guardan automáticamente en Cloudinary y se muestran en este muro digital.

## 🚀 Cómo desplegar en GitHub Pages

Para que tu álbum esté online para todos tus invitados, sigue estos pasos:

1. **Crear un repositorio en GitHub**: Crea un nuevo repositorio (ej: `boda-rocio-matias`) y sube todos estos archivos.
2. **Configurar Cloudinary**: Asegúrate de que en `services/cloudService.ts` tu `CLOUD_NAME` sea `dzmwybq2v` y tu `UPLOAD_PRESET` sea el nombre del preset **Unsigned** que creaste.
3. **Activar Pages**:
   - En tu repositorio de GitHub, ve a **Settings** (Ajustes).
   - En el menú izquierdo, haz clic en **Pages**.
   - En "Build and deployment" > "Branch", selecciona la rama `main` y la carpeta `/(root)`.
   - Haz clic en **Save**.
4. **¡Listo!**: En unos minutos, GitHub te dará una URL (ej: `https://tu-usuario.github.io/boda-rocio-matias/`) que podrás compartir con tus invitados.

## 🛠️ Notas Técnicas
- **Almacenamiento**: Las imágenes se almacenan en Cloudinary usando *Contextual Metadata* para preservar los mensajes de los invitados sin necesidad de una base de datos externa.
- **Offline Ready**: La aplicación es una SPA (Single Page Application) que funciona directamente en el navegador.

---
*Felicidades Rocío y Matías por este gran paso.*
