import { testimonials } from '../../utils/mockData';
import TestimonialCard from '../cards/TestimonialCard';
import SectionHeading from '../ui/SectionHeading';

export default function TestimonialsSection() {
	return (
		<section
			id="testimonials"
			className="section-anchor py-20">
			<SectionHeading
				eyebrow="Customer Testimonials"
				title="Loved by Fashion Enthusiasts and Style Creators"
				description="Glass review cards designed to build social proof and reduce buyer hesitation in high-consideration products."
			/>

			<div className="mt-10 grid gap-6 md:grid-cols-3">
				{testimonials.map((testimonial) => (
					<TestimonialCard
						key={testimonial.name}
						testimonial={testimonial}
					/>
				))}
			</div>
		</section>
	);
}
