import React, { useEffect, useState } from "react";
import styles from "../../assets/styles/postpage.module.css";

interface RatingComponentProps {
  id: string | undefined;
  userInfo: any;
}

export default function RatingComponent({id, userInfo}: RatingComponentProps) {
  const [rating, setRating] = useState<number | null>(null);
  const [userRating, setUserRating] = useState<number | null>(null);
  const [avgRating, setAvgRating] = useState<number | null>(null);

  // submit rating
  const submitRating = async () => {
    console.log("submitting rating");

    // check if user is logged in
    if (!userInfo.isLoggedIn) {
      alert("You must be logged in to rate a post.");
      return;
    }

    if (!rating) {
      alert("Please select a rating before submitting.");
      return;
    }

    const response = await fetch("http://localhost:5000/rating", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postId: id,
        userId: userInfo.user_id,
        rating: rating,
      }),
    });

    if (response.ok) {
      fetchPostRating();
      fetchAvgPostRating();
    } else {
      alert("Something went wrong while submitting your rating.");
    }
  };

  // fetch user rating
  const fetchPostRating = async () => {
    if (userInfo.isLoggedIn === false) return;

    const response = await fetch(
      `http://localhost:5000/rating/${id}/${userInfo.user_id}`
    );
    if (response.ok) {
      const data = await response.json();
      setUserRating(data.data);
    } else {
      const err = await response.text();
      console.log(err);
      // setError(message);
    }
  };

  // fetch average rating
  const fetchAvgPostRating = async () => {
    const response = await fetch(
      `http://localhost:5000/rating/avgPostRating/${id}`
    );
    if (response.ok) {
      const data = await response.json();
      setAvgRating(Number(data.data));
    } else {
      const err = await response.text();
      console.log(err);
      // setError(message);
    }
  };

  useEffect(() => {
    fetchPostRating();
    fetchAvgPostRating();
  }, [id, userInfo]);

  return (
    <div className={styles.postRatingContainer}>
      <div className={styles.postAverageRating}>
        <p>
          Post Rating: {avgRating ? avgRating.toFixed(2) : "No ratings yet"}
        </p>
      </div>
      <div className={styles.postRating}>
        <p>Rate this post:</p>
        <div className={styles.postRatingStars}>
          {[1, 2, 3, 4, 5].map((value) => (
            <svg
              key={value}
              xmlns="http://www.w3.org/2000/svg"
              fill={value <= (rating || 0) ? "gold" : "none"}
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="postRatingStar"
              data-value={value}
              onClick={(e) =>
                setRating(Number((e.target as HTMLElement).dataset.value))
              }
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
              />
            </svg>
          ))}
        </div>
        <button onClick={submitRating} type="button">
          Submit Rating
        </button>
      </div>
      <p>Your rating: {userRating ? `${userRating} stars` : "N/A"}</p>
    </div>
  );
}
