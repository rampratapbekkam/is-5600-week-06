import { useParams, Link } from 'react-router-dom';

const SingleView = ({ data }) => {
  const { id } = useParams();
  const product = data.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="pa4 mt5">
        <h1>Product not found</h1>
        <Link to="/" className="link blue">Back to products</Link>
      </div>
    );
  }

  const title = product.description || product.alt_description || "Untitled";
  const photographerName = product.user?.name || "Unknown";
  const photographerUsername = product.user?.username || "";
  const photographerLocation = product.user?.location || "";
  
  return (
    <div className="pa4 mt5">
      <Link to="/" className="link blue mb3 db">← Back to all products</Link>
      
      <div className="cf">
        <div className="fl w-100 w-50-ns pa2">
          <img 
            src={product.urls?.regular || product.urls?.small}
            alt={title}
            className="w-100"
          />
        </div>
        
        <div className="fl w-100 w-50-ns pa2">
          <h1 className="f2 lh-title mt0">{title}</h1>
          
          <div className="mb3">
            <p className="f5 b mb1">Photographer</p>
            <p className="f4 lh-copy">{photographerName}</p>
            {photographerUsername && (
              <p className="f6 gray">@{photographerUsername}</p>
            )}
            {photographerLocation && (
              <p className="f6 gray mt1">📍 {photographerLocation}</p>
            )}
          </div>

          <div className="mb3">
            <p className="f5 b">Dimensions</p>
            <p className="f6">{product.width} × {product.height} pixels</p>
          </div>

          <div className="mb3">
            <p className="f5 b">Likes</p>
            <p className="f6">❤️ {product.likes?.toLocaleString() || 0}</p>
          </div>
          
          {product.tags && product.tags.length > 0 && (
            <div className="mt3">
              <h3 className="f5 fw6 mb2">Tags:</h3>
              <div className="flex flex-wrap">
                {product.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="f6 br-pill ba ph3 pv1 mb2 mr2 black b--black-10"
                  >
                    {tag.title}
                  </span>
                ))}
              </div>
            </div>
          )}

          {product.links?.html && (
            <div className="mt4">
              <a 
                href={product.links.html}
                target="_blank"
                rel="noopener noreferrer"
                className="f6 link dim ph3 pv2 mb2 dib white bg-black"
              >
                View on Unsplash →
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleView;