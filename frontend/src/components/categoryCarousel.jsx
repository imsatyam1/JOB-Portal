import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Cat } from "lucide-react";

const category = [
    "Frontend Developer", "Backend Developer", "Data Science", "Python Developer", "Reactjs Developer"
]

const CategoryCarousel = () => {
    // const dispatch = useDispatch();
    // const navigate = useNavigate();
    // const searchJobHandler = (query) => {
    // }

    return(
        <div>
            <Carousel className="w-full max-w-2xl mx-auto my-20 md:my-30 lg:my-40">
                <CarouselContent>
                    {
                        category.map((Cat, index) => (
                            <CarouselItem className="basis-1/2 md:basis-1/3">
                                <Button variant="outline" className="rounded-full text-sm md:text-base lg:text-lg">{Cat}</Button>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious className="text-gray-500 hover:text-gray-900" />
                <CarouselNext className="text-gray-500 hover:text-gray-900" />
            </Carousel>
        </div>
    )
}

export default CategoryCarousel;