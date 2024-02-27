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

    const response = await fetch(`${process.env.REACT_APP_HEROKU_URL}rating`, {
      method: "POST",
      credentials: "include",
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
      `${process.env.REACT_APP_HEROKU_URL}rating/${id}/${userInfo.user_id}`
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
      `${process.env.REACT_APP_HEROKU_URL}rating/ratingSummary/${id}`
    );
    if (response.ok) {
      const data = await response.json();
      // console.log(data)
      setAvgRating(Number(data.data.averageRating));
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

  // return (
  //   <div className={styles.postRatingContainer}>
  //     <div className={styles.postAverageRating}>
  //       <p>
  //         Rating: {avgRating ? avgRating.toFixed(2) : "No ratings yet"}
  //       </p>
  //     </div>
  //     <div className={styles.postRating}>
  //       <p>Rate this post:</p>
  //       <div className={styles.postRatingStars}>
  //         {[1, 2, 3, 4, 5].map((value) => (
  //           <svg
  //             key={value}
  //             xmlns="http://www.w3.org/2000/svg"
  //             fill={value <= (rating || 0) ? "gold" : "none"}
  //             viewBox="0 0 24 24"
  //             strokeWidth={1.5}
  //             stroke="currentColor"
  //             className="postRatingStar"
  //             data-value={value}
  //             onClick={(e) =>
  //               setRating(Number((e.target as HTMLElement).dataset.value))
  //             }
  //           >
  //             <path
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //               d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
  //             />
  //           </svg>
  //         ))}
  //       </div>
  //       <button onClick={submitRating} type="button">
  //         Submit Rating
  //       </button>
  //     </div>
  //     <p>Your rating: {userRating ? `${userRating} stars` : "N/A"}</p>
  //   </div>
  // );

  return (
    <div>
      <div className="bg-soft-mint text-sm w-48 h-36 p-2 rounded-md flex flex-col items-center gap-2">
        <div className="text-center pt-2 w-full">
          <p>
            Average Rating: {avgRating ? avgRating.toFixed(2) : "No ratings yet"}
          </p>
        </div>
        <div className="text-center w-full">
          <p>Rate this post:</p>
          <div className="flex mt-1 pb-2 justify-center gap-1">
            {[1, 2, 3, 4, 5].map((value) => (
              <svg
                key={value}
                xmlns="http://www.w3.org/2000/svg"
                fill={value <= (rating || 0) ? "gold" : "none"}
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-7 h-7 cursor-pointer"
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
          <button onClick={submitRating} type="button" className="h-8 w-24 text-xs rounded border-none cursor-pointer text-bright-teal bg-white font-semibold hover:bg-bright-teal hover:text-white transition-colors duration-300">
            Submit Rating
          </button>
        </div>
      </div>

      <p className="text-center w-full text-sm my-2">Your rating: {userRating ? `${userRating} stars` : "N/A"}</p>
    </div>
  );

  // w-24 h-10 mt-10 bg-white text-bright-teal rounded border-2 border-bright-teal font-semibold hover:bg-bright-teal hover:text-white transition-colors duration-300 ease-in-out mx-auto
  
}
