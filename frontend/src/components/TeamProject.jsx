import React from "react";

const TeamProject = () => {
    const teamMembers = [
        {
            name: "Philipp",
            role: "Frontend Developer",
            image: "https://example.com/philipp.jpg", // Bild von Philipp
        },
        {
            name: "Kevin",
            role: "Backend Developer",
            image: "https://example.com/kevin.jpg", // Bild von Kevin
        },
        {
            name: "Anna",
            role: "UI/UX Designer",
            image: "https://example.com/anna.jpg", // Bild von Anna
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
