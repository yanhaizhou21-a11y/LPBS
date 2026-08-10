'use client';

import type { ReactNode } from 'react';
import {
  ArrowRight,
  Bookmark,
  Heart,
  type LucideIcon,
  UserRound,
  UsersRound,
} from 'lucide-react';

import { Button } from '@/components/base-ui/button';
import { Card, CardContent } from '@/components/base-ui/card';
import { cn } from '@/lib/utils';

export type Blog4Accent = 'violet' | 'green' | 'blue';

export interface Blog5Article {
  category: string;
  readTime: string;
  title: string;
  href?: string;
  accent: Blog4Accent;
  imageSrc: string;
  imageAlt: string;
  icon?: LucideIcon;
}

export interface Blog4Data {
  badge: string;
  heading: string;
  description: string;
  viewAllLabel: string;
  viewAllHref: string;
  articles: Blog5Article[];
  activeSlide?: number;
  slideCount?: number;
}

export interface Blog4Props {
  data?: Blog4Data;
  className?: string;
  renderViewAllLink?: (props: {
    href: string;
    children: ReactNode;
  }) => ReactNode;
  renderArticleLink?: (props: {
    href: string;
    children: ReactNode;
  }) => ReactNode;
}

const accentClasses: Record<
  Blog4Accent,
  {
    dot: string;
    iconTile: string;
    icon: string;
    cta: string;
    ctaText: string;
  }
> = {
  violet: {
    dot: 'bg-violet-500',
    iconTile: 'bg-violet-100 dark:bg-violet-500/20',
    icon: 'text-violet-700 dark:text-violet-300',
    cta: 'bg-violet-50 hover:bg-violet-100 dark:bg-violet-500/10 dark:hover:bg-violet-500/20',
    ctaText: 'text-violet-700 dark:text-violet-300',
  },
  green: {
    dot: 'bg-emerald-500',
    iconTile: 'bg-emerald-100 dark:bg-emerald-500/20',
    icon: 'text-emerald-700 dark:text-emerald-300',
    cta: 'bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-500/10 dark:hover:bg-emerald-500/20',
    ctaText: 'text-emerald-700 dark:text-emerald-300',
  },
  blue: {
    dot: 'bg-blue-500',
    iconTile: 'bg-blue-100 dark:bg-blue-500/20',
    icon: 'text-blue-700 dark:text-blue-300',
    cta: 'bg-blue-50 hover:bg-blue-100 dark:bg-blue-500/10 dark:hover:bg-blue-500/20',
    ctaText: 'text-blue-700 dark:text-blue-300',
  },
};

const defaultBlog4Data: Blog4Data = {
  badge: 'ARTIKEL & PANDUAN',
  heading: 'Riset Benih & Panduan\nBudidaya Hortikultura',
  description:
    'Tips praktis, kisah inspiratif, dan wawasan budidaya sayuran dari para pakar IPB University.',
  viewAllLabel: 'Lihat Semua Artikel',
  viewAllHref: '#',
  activeSlide: 0,
  slideCount: 3,
  articles: [
    {
      category: 'Tips Budidaya',
      readTime: '5 menit baca',
      title:
        'Rahasia Memilih Benih Sayuran Bersertifikat dengan Daya Kecambah >85%',
      href: '#',
      accent: 'green',
      imageSrc:
        'https://images.unsplash.com/photo-1592417817098-8f3d6eb22657?w=800&q=80',
      icon: UsersRound,
      imageAlt: 'Penyemaian benih sayuran unggul di media tanam',
    },
    {
      category: 'Urban Farming',
      readTime: '4 menit baca',
      title: 'Optimalisasi Lahan Pekarangan Rumah untuk Panen Sayur Segar Rutin',
      href: '#',
      accent: 'violet',
      imageSrc:
        'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&q=80',
      icon: Heart,
      imageAlt: 'Kebun sayur hidroponik pekarangan rumah',
    },
    {
      category: 'Peluang Usaha',
      readTime: '6 menit baca',
      title: 'Strategi Memasok Sayuran Berkualitas ke Pasar Swalayan dan Resto',
      href: '#',
      accent: 'blue',
      imageSrc:
        'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=800&q=80',
      icon: UserRound,
      imageAlt: 'Panen sayuran segar melimpah petani mitra binaan',
    },
  ],
};

export function Blog4({
  data = defaultBlog4Data,
  className,
  renderViewAllLink,
  renderArticleLink,
}: Blog4Props) {
  const viewAll = (
    <Button
      asChild
      variant="ghost"
      className="text-foreground h-auto rounded-none border-b border-zinc-300 dark:border-zinc-700 px-0 pb-3 text-lg font-semibold hover:bg-transparent"
    >
      <span className="flex items-center">
        {data.viewAllLabel}
        <ArrowRight className="ml-3 size-5" />
      </span>
    </Button>
  );

  return (
    <section className={cn('bg-muted/30 w-full py-12', className)}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-8 lg:grid-cols-[1fr_400px] lg:items-start lg:gap-10">
          <div>
            {data.badge && (
              <span className="inline-flex rounded-full bg-emerald-100 dark:bg-emerald-950 px-3 py-1 text-xs font-bold text-emerald-800 dark:text-emerald-300">
                {data.badge}
              </span>
            )}
            <h2 className="text-foreground mt-4 max-w-2xl text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight whitespace-pre-line leading-tight">
              {data.heading}
            </h2>

            <p className="text-muted-foreground mt-4 max-w-xl text-base sm:text-lg leading-relaxed">
              {data.description}
            </p>
          </div>

          <div className="pt-0 lg:pt-16">
            <p className="text-muted-foreground max-w-sm text-base leading-relaxed">
              Dapatkan modul panduan langkah demi langkah yang telah teruji di laboratorium dan kebun riset IPB University.
            </p>
            <div className="mt-6 w-fit">
              {renderViewAllLink ? (
                renderViewAllLink({
                  href: data.viewAllHref,
                  children: viewAll,
                })
              ) : (
                <a href={data.viewAllHref}>{viewAll}</a>
              )}
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:mt-12 lg:grid-cols-3 lg:gap-6">
          {data.articles.map((article) => (
            <Blog5ArticleCard
              key={`${article.category}-${article.title}`}
              article={article}
              renderArticleLink={renderArticleLink}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Blog5ArticleCard({
  article,
  renderArticleLink,
}: {
  article: Blog5Article;
  renderArticleLink?: Blog4Props['renderArticleLink'];
}) {
  const accent = accentClasses[article.accent] || accentClasses.green;

  const card = (
    <Card className="group border-border bg-card flex h-full flex-col overflow-hidden rounded-2xl pt-0 pb-4 shadow-sm transition-all hover:shadow-md">
      <div className="relative h-60 overflow-hidden sm:h-64">
        <img
          src={article.imageSrc}
          alt={article.imageAlt}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        <div className="bg-background/90 text-foreground hover:bg-background absolute top-4 right-4 flex size-10 items-center justify-center rounded-full shadow-sm backdrop-blur-sm transition-colors">
          <Bookmark className="size-5" strokeWidth={1.7} />
        </div>
      </div>

      <CardContent className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-2">
          <div className="text-muted-foreground flex items-center gap-2 text-sm">
            <span className={cn('size-2 rounded-full', accent.dot)} />
            <span className="font-semibold text-zinc-700 dark:text-zinc-300">{article.category}</span>
          </div>
          <span className="text-muted-foreground shrink-0 text-xs font-medium">
            {article.readTime}
          </span>
        </div>

        <h3 className="text-foreground mt-2.5 mb-3 text-lg font-bold tracking-tight line-clamp-2">
          {article.title}
        </h3>

        <div className="mt-auto pt-3 border-t border-zinc-100 dark:border-zinc-800">
          <span className={cn("inline-flex items-center gap-1 text-xs font-semibold", accent.ctaText)}>
            Baca artikel
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </CardContent>
    </Card>
  );

  if (renderArticleLink && article.href) {
    return renderArticleLink({ href: article.href, children: card });
  }

  if (article.href) {
    return (
      <a
        href={article.href}
        className="focus-visible:ring-ring block rounded-2xl focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
      >
        {card}
      </a>
    );
  }

  return card;
}

export default Blog4;
