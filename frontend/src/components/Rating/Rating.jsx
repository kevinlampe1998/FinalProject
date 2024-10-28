import React, { useState } from "react";
import { Star } from "lucide-react";

const Rating = () => {
    const [rating, setRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [comment, setComment] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleStarClick = (selectedRating) => {
        setRating(selectedRating);
    };

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleSubmit = () => {
        if (rating > 0) {
            setIsSubmitted(true);
            // Hier könnte man die Bewertung und den Kommentar an einen Server senden
            console.log({
                rating,
                comment,
            });
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">
                Wie bewerten Sie unseren Service?
            </h2>

            <div className="flex items-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        className="p-1 transition-colors duration-200"
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                        onClick={() => handleStarClick(star)}
                        disabled={isSubmitted}
                    >
                        <Star
                            size={32}
                            className={`${
                                star <= (hoveredRating || rating)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                            } transition-colors duration-200`}
                        />
                    </button>
                ))}
            </div>

            <p className="mb-4">
                {rating === 0
                    ? "Wählen Sie eine Bewertung"
                    : isSubmitted
                    ? "Vielen Dank für Ihre Bewertung!"
                    : `Sie haben ${rating} ${
                          rating === 1 ? "Stern" : "Sterne"
                      } ausgewählt`}
            </p>

            <div className="mb-4">
                <label
                    htmlFor="comment"
                    className="block text-sm font-medium text-gray-700 mb-2"
                >
                    Ihr Kommentar (optional)
                </label>
                <textarea
                    id="comment"
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Teilen Sie uns Ihre Erfahrungen mit..."
                    value={comment}
                    onChange={handleCommentChange}
                    disabled={isSubmitted}
                />
            </div>

            {isSubmitted && comment && (
                <div className="mb-4 p-3 bg-gray-50 rounded-md">
                    <p className="text-sm font-medium text-gray-700">
                        Ihr Kommentar:
                    </p>
                    <p className="text-sm text-gray-600">{comment}</p>
                </div>
            )}

            <button
                onClick={handleSubmit}
                disabled={rating === 0 || isSubmitted}
                className={`w-full px-4 py-2 rounded ${
                    rating === 0 || isSubmitted
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-blue-500 hover:bg-blue-600 text-white"
                }`}
            >
                {isSubmitted ? "Gesendet" : "Bewertung absenden"}
            </button>

            {isSubmitted && (
                <p className="mt-4 text-sm text-green-600 text-center">
                    Ihre Bewertung wurde erfolgreich übermittelt. Vielen Dank
                    für Ihr Feedback!
                </p>
            )}
        </div>
    );
};

export default Rating;

//test//
