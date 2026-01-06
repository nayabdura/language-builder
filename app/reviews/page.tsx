import React from "react";
import ReviewsHero from "../components/animations/ReviewsHero";
import ParentsReviewsGrid from "../components/animations/ParentsReviewsGrid";
import ChildrenGallery from "../components/animations/ChildrenGallery";
import FeaturedTestimonials from "../components/animations/FeaturedTestimonials";
import ReviewsStats from "../components/animations/ReviewsStats";
import ReviewsCTA from "../components/animations/ReviewsCTA";

export const metadata = {
  title: "Reviews | Language Builders",
  description: "See why parents trust us and children love learning with Language Builders.",
};

export default function ReviewsPage() {
  return (
    <main className="bg-white min-h-screen overflow-x-hidden">
      <ReviewsHero />
      
      {/* Spacing between sections is handled by padding y on the section containers */}
      <ParentsReviewsGrid />
      <ChildrenGallery />
      <FeaturedTestimonials />
      <ReviewsStats />
      <ReviewsCTA />
    </main>
  );
}