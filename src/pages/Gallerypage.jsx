// src/components/Gallery.jsx
import ImageCard from '../components/ImageCard.jsx';

const images = [
  { id: 1, src: '/images/img1.jpg', alt: 'Sunset' },
  { id: 2, src: '/images/img2.jpg', alt: 'Forest' },
  { id: 3, src: '/images/img3.jpg', alt: 'Ocean' },
];

export default function Gallery() {
  return (
    <div style={styles.container}>
      {images.map(img => (
        <ImageCard key={img.id} src={img.src} alt={img.alt} />
      ))}
    </div>
  );
}

const styles = {
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1rem',
    padding: '1rem',
  },
};
