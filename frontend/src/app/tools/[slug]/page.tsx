import { tools } from '@/lib/tools';
import ToolClient from './ToolClient';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = tools.find((t) => t.id === slug);

  if (!tool) {
    return {
      title: 'Tool Not Found',
    };
  }

  return {
    title: `${tool.name} - FileConv`,
    description: tool.description,
  };
}

export async function generateStaticParams() {
  return tools.map((tool) => ({
    slug: tool.id,
  }));
}

export default async function Page({ params }: Props) {
  // Pass the promise directly if ToolClient expects it, or await it here.
  // ToolClient uses `use(params)` so it expects the promise.
  return <ToolClient params={params} />;
}
