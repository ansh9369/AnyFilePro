import Navbar from '@/components/Navbar';
import ToolCard from '@/components/ToolCard';
import Hero from '@/components/Hero';
import { tools } from '@/lib/tools';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <Hero />

      {/* Tools Grid */}
      <section className="container mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>
    </main>
  );
}
