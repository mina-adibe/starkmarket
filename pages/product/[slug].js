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

const ProductScreen = () => {
  const router = useRouter();

  const { state, dispatch } = useContext(Store);

  const {
    asPath,
    pathname,
    query: { slug },
  } = useRouter();

  const [currentUrl, setcurrentUrl] = useState("");
  useEffect(() => {
    const url = window.location.href;
    setcurrentUrl(url);
  }, []);

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
    <Layout title={product.name}>
      <NextSeo
        title="stark market is here"
        description="starkmarket company to increase revenue"
        canonical="https://starkmarket.vercel.app/"
        openGraph={{
          url: currentUrl,
          title: "stark market is here",
          description: "stark market is hereh Description",
          images: [
            {
              url: product.image,
              width: 800,
              height: 600,
              alt: "stark market Image Alt",
              type: "image/jpeg",
            },
          ],
          site_name: "stark market",
        }}
        twitter={{
          handle: "@handle",
          site: "@site",
          cardType: "summary_large_image",
        }}
      />
      <div className="py-2">
        <Link href="/">back to products</Link>
      </div>
      <div>
        <FacebookShareButton
          url={currentUrl}
          quote={"next-share is a social share buttons for your next React apps."}>
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        <TelegramShareButton url={currentUrl}>
          <TelegramIcon size={25} round />
        </TelegramShareButton>
        <RedditShareButton url={currentUrl}>
          <RedditIcon size={25} round />
        </RedditShareButton>
        <WhatsappShareButton url={currentUrl}>
          <WhatsappIcon size={25} round />
        </WhatsappShareButton>
        <LinkedinShareButton url={currentUrl}>
          <LinkedinIcon size={25} round />
        </LinkedinShareButton>
      </div>
      <div>
        <div>item details</div>
        <div>currentUrl: {currentUrl}</div>
        <div>asPath: {asPath}</div>
        <div>pathname: {pathname}</div>
        <div>URL-method2: {URL}</div>
      </div>

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
    </Layout>
  );
};

export default ProductScreen;
