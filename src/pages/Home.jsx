import CategorySection from '../components/CategorySection';
import FeaturedProducts from '../components/FeaturedProducts';
import HeroSection from '../components/HeroSection';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturedProducts />
      <CategorySection />
    </div>
  );
}
