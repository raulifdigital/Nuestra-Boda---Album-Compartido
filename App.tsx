
import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import UploadModal from './components/UploadModal';
import { ViewMode, WeddingPhoto } from './types';
import { subscribeToPhotos, savePhotoToCloud, isCloudActive } from './services/cloudService';
import { Heart, Camera, BookOpen, Code, Star, GitFork, Info, ChevronDown, Download, Plus, Cloud, CloudOff } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<ViewMode>(ViewMode.HOME);
  const [photos, setPhotos] = useState<WeddingPhoto[]>([]);
  const [showUpload, setShowUpload] = useState(false);

  useEffect(() => {
    // Suscripción en tiempo real a la nube (Cloudinary)
    const unsubscribe = subscribeToPhotos((updatedPhotos) => {
      setPhotos(updatedPhotos);
    });
    return () => unsubscribe();
  }, []);

  const handleUpload = async (data: { file: File; author: string; dedication: string }) => {
    try {
      await savePhotoToCloud(data);
    } catch (error) {
      console.error("Error al guardar en Cloudinary:", error);
      throw error;
    }
  };

  const downloadAllMedia = () => {
    if (photos.length === 0) return;
    photos.forEach((item, index) => {
      setTimeout(() => {
        const link = document.createElement('a');
        link.href = item.url;
        link.download = `boda-rocio-matias-${item.id}.${item.type === 'video' ? 'mp4' : 'jpg'}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }, index * 400);
    });
  };

  if (view === ViewMode.HOME) {
    return <Hero onEnter={() => setView(ViewMode.GALLERY)} />;
  }

  return (
    <div className="min-h-screen bg-[#f6f8fa] text-[#1f2328] font-sans pb-32">
      {/* Estado de la Nube */}
      {!isCloudActive() && (
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-center text-xs text-amber-700 font-medium flex items-center justify-center gap-2">
          <CloudOff className="w-3 h-3" />
          Falta configurar Cloud Name y Upload Preset en cloudService.ts
        </div>
      )}

      {/* Navbar Estilo GitHub */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-[#d0d7de] pt-4 pb-2 sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xl">
              <Code className="w-5 h-5 text-[#636c76]" />
              <span className="text-[#0969da] hover:underline cursor-pointer font-medium">rocio-matias</span>
              <span className="text-[#636c76]">/</span>
              <span className="font-bold">nuestra-boda-2026</span>
              <span className="ml-2 px-2 py-0.5 text-[10px] font-bold border border-[#d0d7de] rounded-full text-[#636c76] uppercase">Cloudinary-Live</span>
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={downloadAllMedia}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 border border-[#d0d7de] rounded-md bg-white text-xs font-semibold hover:bg-[#f3f4f6] disabled:opacity-50"
                disabled={photos.length === 0}
              >
                <Download className="w-3.5 h-3.5" /> Descargar Todo
              </button>
              <button 
                onClick={() => setShowUpload(true)}
                className="bg-[#1f883d] hover:bg-[#1a7f37] text-white px-4 py-1.5 rounded-md text-xs font-bold shadow-sm flex items-center gap-1.5 transition-transform active:scale-95"
              >
                <Plus className="w-3.5 h-3.5" /> Nuevo Aporte
              </button>
            </div>
          </div>

          <div className="flex items-center gap-6 mt-4 text-sm font-normal overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-1.5 pb-2 border-b-2 border-[#fd8c73] text-[#1f2328] font-semibold whitespace-nowrap">
              <BookOpen className="w-4 h-4" /> Álbum Colectivo
            </div>
            <div className="flex items-center gap-1.5 pb-2 text-[#636c76] whitespace-nowrap">
              <Cloud className="w-4 h-4" /> Cloudinary <span className="bg-[#afb8c133] px-1.5 rounded-full text-xs">{photos.length}</span>
            </div>
          </div>
        </div>
      </nav>

      {/* BOTÓN FLOTANTE (FAB) ULTRA LLAMATIVO */}
      <div className="fixed bottom-10 right-6 md:right-12 z-50 group">
        <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-rose-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap hidden md:block">
          ¡Comparte tu foto o video aquí! ✨
        </div>
        <button 
          onClick={() => setShowUpload(true)}
          className="relative w-16 h-16 md:w-20 md:h-20 bg-rose-500 rounded-full flex items-center justify-center text-white shadow-[0_10px_40px_rgba(244,63,94,0.4)] hover:bg-rose-600 transition-all active:scale-90 hover:scale-110 pulse-effect"
        >
          <div className="flex flex-col items-center">
             <Camera className="w-6 h-6 md:w-8 md:h-8 mb-0.5" />
             <span className="text-[10px] font-bold uppercase tracking-tighter">Subir</span>
          </div>
        </button>
      </div>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-[#d0d7de] rounded-md text-xs font-semibold hover:bg-[#f3f4f6]">
              <GitFork className="w-3.5 h-3.5" /> principal <ChevronDown className="w-3 h-3" />
            </button>
            <span className="text-sm text-[#636c76] font-mono">boda / recuerdos / cloudinary /</span>
          </div>
        </div>

        <div className="bg-white border border-[#d0d7de] rounded-lg overflow-hidden shadow-sm">
          <div className="bg-[#f6f8fa] border-b border-[#d0d7de] p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Heart className="w-5 h-5 text-rose-500 fill-current" />
              <span className="text-sm font-bold uppercase tracking-wider text-gray-700">Muro de los Invitados</span>
            </div>
          </div>
          <div className="p-4 md:p-8">
            <Gallery photos={photos} />
          </div>
        </div>
      </main>

      {showUpload && (
        <UploadModal 
          onClose={() => setShowUpload(false)} 
          onUpload={handleUpload} 
        />
      )}

      <footer className="mt-20 py-12 text-center text-[#636c76] border-t border-[#d0d7de] bg-white">
        <Heart className="w-4 h-4 text-rose-500 mx-auto mb-4" />
        <p className="font-serif italic text-xl text-gray-800">Rocío & Matías</p>
        <p className="text-[10px] font-mono tracking-widest uppercase mt-2 opacity-60">
          Guardado en la nube de Cloudinary • 2026
        </p>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
};

export default App;
