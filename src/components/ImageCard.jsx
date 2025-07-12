// src/components/ImageCard.jsx
export default function ImageCard({ src, alt }) {
  return (
    <div style={styles.card}>
      <img src={src} alt={alt} style={styles.img} />
      <p>{alt}</p>
    </div>
  );
}

const styles = {
  card: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '0.5rem',
    textAlign: 'center',
    backgroundColor: '#f8f8f8',
  },
  img: {
    width: '100%',
    height: 'auto',
    borderRadius: '4px',
  },
};
