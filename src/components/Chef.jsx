const Chef = ({ name, post, image }) => {
  return (
    <>
      <div className="chef-card">
        <img src={image} alt={post} loading="lazy" className="img-fluid" />
        <div className="overlay">
          <div className="chef-info">
            <h3 className="chef-name">{name}</h3>
            <p className="chef-post">{post}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chef;
