import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";

import data from "../../utils/data";
import Layout from "../../components/Layout";
import { Store } from "../../utils/store";

import Head from "next/head";

import {
  FacebookShareButton,
  FacebookIcon,
  TelegramShareButton,
  RedditShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  TelegramIcon,
  RedditIcon,
  WhatsappIcon,
  LinkedinIcon,
} from "next-share";
import { NextSeo } from "next-seo";

const ProductScreen = (props) => {
  console.log("props", props);
  function addProductJsonLd() {
    return {
      __html: `{
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": "Executive Anvil",
      "image": [
        "https://example.com/photos/1x1/photo.jpg",
        "https://example.com/photos/4x3/photo.jpg",
        "https://example.com/photos/16x9/photo.jpg"
       ],
      "description": "Sleeker than ACME's Classic Anvil, the Executive Anvil is perfect for the business traveler looking for something to drop from a height.",
      "sku": "0446310786",
      "mpn": "925872",
      "brand": {
        "@type": "Brand",
        "name": "ACME"
      },
      "review": {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "4",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Fred Benson"
        }
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.4",
        "reviewCount": "89"
      },
      "offers": {
        "@type": "Offer",
        "url": "https://example.com/anvil",
        "priceCurrency": "USD",
        "price": "119.99",
        "priceValidUntil": "2020-11-20",
        "itemCondition": "https://schema.org/UsedCondition",
        "availability": "https://schema.org/InStock"
      }
    }
  `,
    };
  }

  const router = useRouter();

  const { state, dispatch } = useContext(Store);

  const {
    asPath,
    pathname,
    query: { slug },
  } = useRouter();

  // const [currentUrl, setcurrentUrl] = useState("");
  // useEffect(() => {
  //   const url = window.location.href;
  //   setcurrentUrl(url);
  // }, []);

  const origin =
    typeof window !== "undefined" && window.location.origin ? window.location.origin : "";

  const URL = `${origin}${asPath}`;

  // get the product
  const product = data.products.find((item) => item.slug === slug);

  if (!product) {
    return <div>Product not found </div>;
  }

  const addToCartFunction = () => {
    const existItem = state.cart.cartItems.find((item) => item.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    if (quantity > product.countInStock) {
      alert("Sorry this product is out of stock ");
      return;
    }

    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
    router.push("/cart");
  };

  return (
    <div>
      <Head>
        <title>My Product</title>
        <meta name="description" content="Super product with free shipping." key="desc" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={addProductJsonLd()}
          key="product-jsonld"
        />
      </Head>
      <div className="py-2">
        <Link href="/">back to products</Link>
      </div>
      <div>
        <FacebookShareButton
          url={`${props.url}/product/${product.name}`}
          quote={"next-share is a social share buttons for your next React apps."}>
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        <TelegramShareButton url={`${props.url}/product/${product.name}`}>
          <TelegramIcon size={25} round />
        </TelegramShareButton>
        <RedditShareButton url={`${props.url}/product/${product.name}`}>
          <RedditIcon size={25} round />
        </RedditShareButton>
        <WhatsappShareButton url={`${props.url}/product/${product.name}`}>
          <WhatsappIcon size={25} round />
        </WhatsappShareButton>
        <LinkedinShareButton url={`${props.url}/product/${product.name}`}>
          <LinkedinIcon size={25} round />
        </LinkedinShareButton>
      </div>
      {/* <div>
        <div>item details</div>
        <div>currentUrl: {currentUrl}</div>
        <div>asPath: {asPath}</div>
        <div>pathname: {pathname}</div>
        <div>URL-method2: {URL}</div>
      </div> */}

      <div className="grid md:grid-cols-4 md:gap-3">
        <div className="md:col-span-2">
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            layout="responsive"></Image>
        </div>
        <div>
          <ul>
            <li>
              <h1 className="text-lg">{product.name}</h1>
            </li>
            <li>Category: {product.category}</li>
            <li>Brand: {product.brand}</li>
            <li>
              {product.rating} of {product.numReviews} reviews
            </li>
            <li>Description: {product.description}</li>
          </ul>
        </div>
        <div>
          <div className="card p-5">
            <div className="mb-2 flex justify-between">
              <div>Price</div>
              <div>${product.price}</div>
            </div>
            <div className="mb-2 flex justify-between">
              <div>Status</div>
              <div>{product.countInStock > 0 ? "In stock" : "Unavailable"}</div>
            </div>
            <button className="primary-button w-full" onClick={addToCartFunction}>
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export const getServerSideProps = (context) => {
  console.log("context", context);
  return {
    props: {
      url: context?.req?.headers?.host,
    },
  };
};

export default ProductScreen;
