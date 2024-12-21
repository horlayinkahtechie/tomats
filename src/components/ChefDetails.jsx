import Chef from "./Chef";
import chefImg1 from "../Images/chef1.jpg";
import chefImg2 from "../Images/chef2.jpg";
import chefImg3 from "../Images/chef3.jpg";
import chefImg4 from "../Images/chef4.jpg";

const ChefDetails = () => {
  const chefs = [
    {
      name: "Chef John Doe",
      post: "Executive Chef",
      image: chefImg1, // Add the path to your chef images
    },
    {
      name: "Chef Jane Smith",
      post: "Pastry Chef",
      image: chefImg2,
    },
    {
      name: "Chef Alex Johnson",
      post: "Sous Chef",
      image: chefImg3,
    },
    {
      name: "Chef Alex Johnson",
      post: "Sous Chef",
      image: chefImg4,
    },
  ];

  return (
    <>
      <div className="container-fluid section-margin">
        <div className="row">
          {chefs.map((chef, index) => (
            <div className="col-md-3 mt-4" key={index}>
              {" "}
              {/* Each Chef in its own column */}
              <Chef name={chef.name} post={chef.post} image={chef.image} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ChefDetails;
