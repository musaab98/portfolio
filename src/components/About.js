import React from 'react';

const About = () => {
    return (
      <div className="about-container">
        <h1>About Me</h1>
        <div className="about-content">
          <img src="pfp.png" alt="Musaab Elsheikh" className="profile-pic"/>
          <div className="about-text">
            <br />
            <p>Hello! I'm a recent graduate from Virginia Polytechnic Institute and State University with a B.S. in Computational Modeling and Data Analytics.</p>
            <br />
            <p>With hands-on experience in full-stack development, machine learning, and data analytics, I am actively seeking software engineering positions where I can leverage my skills in web development. I have a profound passion for creating intuitive and impactful digital solutions, with proficiency in a myriad of programming languages, tools, and methodologies including JavaScript, React, Node.js, Python, AWS, and more.</p>
            <br />
            {/* <p>Throughout my journey, I've undertaken several roles like Freelance Web Developer and Data Scientist, contributed to meaningful projects, and served as the Treasurer for the Muslim Student Association, managing large-scale events and budgets.</p> */}
          </div>
        </div>
      </div>
    );
}

export default About;
