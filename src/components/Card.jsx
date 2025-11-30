import { Link } from 'react-router-dom';

const Card = ({ id, description, alt_description, urls, user, tags }) => {
  // Use description or alt_description, fallback to "Untitled"
  const title = description || alt_description || "Untitled";
  
  // Get photographer name
  const photographerName = user?.name || "Unknown";
  
  return (
    <div className="fl w-50 w-25-m w-20-l pa2">
      <Link to={`/product/${id}`} className="db link dim tc">
        <img 
          src={urls?.small || urls?.thumb} 
          alt={title} 
          className="w-100 db outline black-10"
          style={{ height: '200px', objectFit: 'cover' }}
        />
        <dl className="mt2 f6 lh-copy">
          <dt className="clip">Title</dt>
          <dd className="ml0 black truncate w-100">{title}</dd>
          <dt className="clip">Photographer</dt>
          <dd className="ml0 gray truncate w-100">by {photographerName}</dd>
        </dl>
      </Link>
    </div>
  );
};

export default Card;