// import ArticlePreview from "@components/ArticlePreview";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import MetaData from "@components/MetaData";
import PersonCard from "@components/PersonCard";

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-7xl p-3">
      <MetaData title="Home" />

      <div className="grid sm:grid-cols-2 gap-8">
        <div className="flex flex-col justify-center gap-4">
          <h1 className="text-center">Outfitted</h1>
          <h3 className="text-center">
            Taking the <span className="rainbow-text">Stress</span> out of Getting{" "}
            <span className="rainbow-text">Dressed</span>
          </h3>
          <p>
            Our Mission is to provide users with personalized style selections so they can look and feel good while
            saving time and money
          </p>
        </div>
        <div className="relative h-[200px] sm:h-[400px]">
          <Image src="/closet-minimal.jpg" alt="Minimalistic closet" layout="fill" objectFit="cover" />
        </div>
      </div>

      <h2>Recent Articles</h2>
      {/* <ArticleList>
          <div>
          {articles?.slice(0, 3).map((article) => (
            <ArticleContainer key={article._id}>
            <ArticlePreview compact article={article} />
            </ArticleContainer>
            ))}
            </div>
          </ArticleList> */}
      {/* <Flex gridGap="10" wrap="wrap" justify="center">
          {articles?.slice(0, 3).map((article) => (
            <Link href={`/articles/${article._id}`} key={article._id}>
              <a>
                <ArticleCard {...article} />
              </a>
            </Link>
          ))} */}
      <h2>About Us</h2>
      <div className="grid gap-4 sm:grid-cols-3">
        <PersonCard
          imageUrl="/Graham_bio_image.jpg"
          name="Graham Anderson"
          linkedInUrl="https://www.linkedin.com/in/graham-anderson-736869195/"
          instagramUrl="https://www.instagram.com/grahamandersonn/"
          description="Graham Anderson is a current University of Guelph student studying Marketing Management. Graham founded Outfitted with his co-founder James Romain with the belief that everyone should be able to find their own style and feel confident about the clothes in their closet. Graham’s goals for Outfitted are to grow the businesses presence in the targeted social media spaces as well as focusing on giving users the highest quality clothing suggestions. Since starting Outfitted Graham has learned a lot about entrepreneurship including the ins and outs of running a business and is looking to continue learning as the business grows. Graham has a passion for Managing and a drive to innovate as an entrepreneur."
          role="Co-Founder"
        />
        <PersonCard
          imageUrl="/James_bio_image.jpg"
          role="Co-Founder"
          description="James Romain is current Finance and Economics student at the University of Guelph, with minors in Computer and information sciences and mathematics. James partnered with Graham to found Outfitted Ltd. to solve a simple but challenging problem. Offer a more efficient shopping experience, showing consumers the clothing they want to see all while helping them find their style! When James isn’t trying to revolutionize the fashion industry with Graham, he has a real fascination for the financial markets and equity research. James hopes to use his financial expertise to help Outfitted flip the fashion industry on its head."
          name="James Romain"
          instagramUrl="https://www.instagram.com/jamesromain59/"
          linkedInUrl="https://www.linkedin.com/in/james-romain-27482b187/"
        />
        <PersonCard
          imageUrl="/Conor_bio_image.jpg"
          name="Conor Roberts"
          role="Web Developer"
          description="Conor is a current full-stack developer and Computer Science Major at the University of Guelph. "
          linkedInUrl="https://www.linkedin.com/in/conorjroberts/"
        />
      </div>
    </div>
  );
}
