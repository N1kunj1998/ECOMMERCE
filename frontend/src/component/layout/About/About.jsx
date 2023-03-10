import React from "react";
import "./aboutSection.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import GithubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
const About = () => {
  const visitGithub = () => {
    window.location = "https://github.com/N1kunj1998";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://res.cloudinary.com/ddkwxmgbb/image/upload/v1678461759/WhatsApp_Image_2023-03-10_at_7.52.41_PM_zrmhe6.jpg"
              alt="Founder"
            />
            <Typography>Nikunj Khakhkhar</Typography>
            <Button onClick={visitGithub} color="primary">
              Visit Github
            </Button>
            <span>
            🎉🎉 Woohoo! Just completed my MERN stack ecommerce project 🛍️💻🎉 It was a great learning experience and I'm proud of what I've accomplished 🚀
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">My Handles</Typography>
            
            <a href="https://www.linkedin.com/in/nikunj-khakhkhar-b5627aba/" target="blank">
              <LinkedInIcon  />
            </a>
            <a href="https://github.com/N1kunj1998" target="blank">
              <GithubIcon  />
              <p></p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;