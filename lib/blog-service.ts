
export interface BlogPost {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  date: string;
  excerpt: string;
  image: string;
  scripture: string;
  scriptureText: string;
  points: string[];
  closing: string;
  isPublished: boolean;
}

const STORAGE_KEY = 'rpt_blog_posts';

const DEFAULT_POSTS: BlogPost[] = [
  {
    id: 'december-2025-prophetic-declaration',
    title: 'December 2025',
    subtitle: 'Our Month of Generational Blessings',
    category: 'Prophetic Word',
    date: '2025-12-01',
    excerpt: '“And the Lord said to Abram, after Lot had separated from him: ‘Lift your eyes now...”',
    image: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?q=90&w=2070&auto=format&fit=crop',
    scripture: 'Genesis 13:14–16',
    scriptureText: '“And the Lord said to Abram, after Lot had separated from him: ‘Lift your eyes now and look from the place where you are—northward, southward, eastward, and westward; for all the land which you see I give to you and your descendants forever...”',
    points: [
      "This month is declared our Month of Generational Blessings.",
      "The Lord will make your name great as you walk uprightly before Him.",
      "The covenant blessings of Abraham shall find fresh expressions in your life and lineage."
    ],
    closing: 'So shall this month be better for you, your children, and the entire Gospel Faith Mission International.',
    isPublished: true
  },
  {
    id: 'november-2025-prophetic-declaration',
    title: 'November 2025',
    subtitle: 'Our Month of Continuous Worship',
    category: 'Prophetic Word',
    date: '2025-11-01',
    excerpt: '“Serve the LORD with gladness; Come before His presence with singing.”',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop',
    scripture: 'Psalm 100:2 NKJV',
    scriptureText: '“Serve the LORD with gladness; Come before His presence with singing.”',
    points: [
      "This month is declared as our Month of Continuous Worship.",
      "This is our season of joyful and uninterrupted worship.",
      "Every garment of heaviness is replaced with the garment of praise."
    ],
    closing: 'So shall this month be better for you, your family, and the entire Gospel Faith Mission International.',
    isPublished: true
  },
  {
    id: 'october-2025-prophetic-declaration',
    title: 'October 2025',
    subtitle: 'Our Month of Unlimited Progress',
    category: 'Prophetic Word',
    date: '2025-10-01',
    excerpt: '“But the path of the just is like the shining sun, that shines ever brighter unto the perfect day.”',
    image: 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?q=80&w=2070&auto=format&fit=crop',
    scripture: 'Proverbs 4:18 NKJV',
    scriptureText: '“But the path of the just is like the shining sun, that shines ever brighter unto the perfect day.”',
    points: [
      "This month is declared as our Month of Unlimited Progress.",
      "No more stagnation for you and your household, In Jesus mighty name.",
      "No more delay for you for the Lord is accelerating your destiny."
    ],
    closing: 'So shall this month be better for you, your family, and the entire Gospel Faith Mission International.',
    isPublished: true
  },
  {
    id: 'september-2025-prophetic-declaration',
    title: 'September 2025',
    subtitle: 'Our Month of Extraordinary Miracles',
    category: 'Prophetic Word',
    date: '2025-09-01',
    excerpt: '“Now God worked unusual miracles by the hands of Paul, so that even handkerchiefs...”',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=2070&auto=format&fit=crop',
    scripture: 'Acts 19:11-12',
    scriptureText: '“Now God worked unusual miracles by the hands of Paul, so that even handkerchiefs or aprons were brought from his body to the sick...”',
    points: [
      "This month is declared as our Month of Extraordinary Miracles.",
      "The same God who worked unusual miracles through Paul will work wonders in your life.",
      "By the authority of His Word, diseases are departing from your body."
    ],
    closing: 'So shall this month be better for you, your family, and the entire Gospel Faith Mission International.',
    isPublished: true
  }
];

export const BlogService = {
  getAllPosts: (): BlogPost[] => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_POSTS));
      return DEFAULT_POSTS;
    }
    return JSON.parse(stored);
  },

  getPostById: (id: string): BlogPost | undefined => {
    return BlogService.getAllPosts().find(p => p.id === id);
  },

  savePost: (post: BlogPost) => {
    const posts = BlogService.getAllPosts();
    const index = posts.findIndex(p => p.id === post.id);
    if (index > -1) {
      posts[index] = post;
    } else {
      posts.unshift(post);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  },

  deletePost: (id: string) => {
    const posts = BlogService.getAllPosts();
    const filtered = posts.filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  }
};
