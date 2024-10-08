import ImageMerger from '@/components/ImageMerger';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
      <h1 className="text-2xl font-bold mb-4">Merge Images</h1>
      <ImageMerger />
    </div>
  );
}
