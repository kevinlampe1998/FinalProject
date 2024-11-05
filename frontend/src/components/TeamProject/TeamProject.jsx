import React from "react";
import "./TeamProject.css";

const TeamProject = () => {
    const teamMembers = [
        {
            name: "Philipp Sauerlaender",
            role: "Frontend Developer",
            image: "/images/philipp.jpeg", // Lokaler Pfad im public-Ordner
        },
        {
            name: "Kevin Lampe",
            role: "Backend Developer, Frontend Developer",
            image: "/images/kevin.jpg", // Lokaler Pfad im public-Ordner
        },
        {
            name: "Ralf",
            role: "UI/UX Designer",
            image: "/images/Ralf.jpg", // Lokaler Pfad im public-Ordner
        },
    ];

    return (
        <div className="team-project">
            <h2>Unser Team</h2>
            <ul>
                {teamMembers.map((member, index) => (
                    <li key={index} className="team-member">
                        <img
                            src={member.image}
                            alt={`${member.name}`}
                            className="team-member-image"
                        />
                        <div>
                            <strong>{member.name}</strong> - {member.role}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TeamProject;
