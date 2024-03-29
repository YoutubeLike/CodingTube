// File containing all the HTML content to be displayed

import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import CheckSession from "../../session";
//const { isLoggedIn, userId } = CheckSession();


const DisplayedBurgerMenu = () => {
	const [isNavOpen, setIsNavOpen] = useState(false);
  

	var iconsMenu = [
		<Link to="/" className="flex items-center">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="2em"
				height="2em"
				viewBox="0 0 24 24"
			>
				<path
					fill="currentColor"
					d="M6 19h3v-6h6v6h3v-9l-6-4.5L6 10zm-2 2V9l8-6l8 6v12h-7v-6h-2v6zm8-8.75"
				></path>
			</svg>
			<span className="pl-4">Home</span>
		</Link>,
		<Link to="/short" className="flex items-center">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="2em"
				height="2em"
				viewBox="0 0 16 16"
			>
				<path
					fill="currentColor"
					d="M0 3.75C0 2.784.784 2 1.75 2h12.5c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0 1 14.25 14H1.75A1.75 1.75 0 0 1 0 12.25Zm1.75-.25a.25.25 0 0 0-.25.25v8.5c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25v-8.5a.25.25 0 0 0-.25-.25Z"
				></path>
				<path
					fill="currentColor"
					d="M6 10.559V5.442a.25.25 0 0 1 .379-.215l4.264 2.559a.25.25 0 0 1 0 .428l-4.264 2.559A.25.25 0 0 1 6 10.559"
				></path>
			</svg>
			<span className="pl-4">Shorts</span>
		</Link>,
		<Link to="/feed/subscriptions/grid" className="flex items-center">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="2em"
				height="2em"
				viewBox="0 0 24 24"
			>
				<path
					fill="currentColor"
					d="M4 22q-.825 0-1.412-.587T2 20V10q0-.825.588-1.412T4 8h16q.825 0 1.413.588T22 10v10q0 .825-.587 1.413T20 22zm0-2h16V10H4zm6-1l6-4l-6-4zM4 7V5h16v2zm3-3V2h10v2zM4 20V10z"
				></path>
			</svg>
			<span className="pl-4">Subscriptions</span>
		</Link>,
		<Link to="/history" className="flex items-center">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="2em"
				height="2em"
				viewBox="0 0 24 24"
			>
				<path
					fill="currentColor"
					d="M12 21q-3.15 0-5.575-1.912T3.275 14.2q-.1-.375.15-.687t.675-.363q.4-.05.725.15t.45.6q.6 2.25 2.475 3.675T12 19q2.925 0 4.963-2.037T19 12q0-2.925-2.037-4.962T12 5q-1.725 0-3.225.8T6.25 8H8q.425 0 .713.288T9 9q0 .425-.288.713T8 10H4q-.425 0-.712-.288T3 9V5q0-.425.288-.712T4 4q.425 0 .713.288T5 5v1.35q1.275-1.6 3.113-2.475T12 3q1.875 0 3.513.713t2.85 1.924q1.212 1.213 1.925 2.85T21 12q0 1.875-.712 3.513t-1.925 2.85q-1.213 1.212-2.85 1.925T12 21m1-9.4l2.5 2.5q.275.275.275.7t-.275.7q-.275.275-.7.275t-.7-.275l-2.8-2.8q-.15-.15-.225-.337T11 11.975V8q0-.425.288-.712T12 7q.425 0 .713.288T13 8z"
				></path>
			</svg>
			<span className="pl-4">History</span>
		</Link>,
		<button onClick={GoToChannel} className="flex items-center">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="2em"
				height="2em"
				viewBox="0 0 24 24"
			>
				<path
					fill="currentColor"
					d="M5 17.85q1.35-1.325 3.138-2.087T12 15q2.075 0 3.863.763T19 17.85V5H5zM12 13q1.45 0 2.475-1.025T15.5 9.5q0-1.45-1.025-2.475T12 6q-1.45 0-2.475 1.025T8.5 9.5q0 1.45 1.025 2.475T12 13m-7 8q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21zm2-2h10v-.25q-1.05-.875-2.325-1.312T12 17q-1.4 0-2.675.438T7 18.75zm5-8q-.625 0-1.062-.437T10.5 9.5q0-.625.438-1.062T12 8q.625 0 1.063.438T13.5 9.5q0 .625-.437 1.063T12 11m0 .425"
				></path>
			</svg>
			<span className="pl-4">Your Channel</span>
		</button>,
		<Link to="/videos" className="flex items-center">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="2em"
				height="2em"
				viewBox="0 0 24 24"
			>
				<path
					fill="currentColor"
					d="M17.525 10.625q.35-.225.35-.625t-.35-.625L12.65 6.25q-.375-.25-.763-.038t-.387.663v6.25q0 .45.388.663t.762-.038zM8 18q-.825 0-1.412-.587T6 16V4q0-.825.588-1.412T8 2h12q.825 0 1.413.588T22 4v12q0 .825-.587 1.413T20 18zm0-2h12V4H8zm-4 6q-.825 0-1.412-.587T2 20V7q0-.425.288-.712T3 6q.425 0 .713.288T4 7v13h13q.425 0 .713.288T18 21q0 .425-.288.713T17 22zM8 4v12z"
				></path>
			</svg>
			<span className="pl-4">Your Videos</span>
		</Link>,
		<Link to="/playlist" className="flex items-center">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="2em"
				height="2em"
				viewBox="0 0 512 512"
			>
				<path
					fill="currentColor"
					d="M464 72H48a32.036 32.036 0 0 0-32 32v304a32.036 32.036 0 0 0 32 32h416a32.036 32.036 0 0 0 32-32V104a32.036 32.036 0 0 0-32-32m0 336H48V104h416l.02 304Z"
				></path>
				<path
					fill="currentColor"
					d="M232 184h184v32H232zm-56 72h240v32H176zm0 72h240v32H176zM88.923 144v128.923l99.172-69.42z"
				></path>
			</svg>
			<span className="pl-4">Playlist</span>
		</Link>,
		<Link to="/trends" className="flex items-center">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="2em"
				height="2em"
				viewBox="0 0 14 14"
			>
				<g
					fill="none"
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path d="M6.15.53a.39.39 0 0 0-.4 0a.26.26 0 0 0-.06.34C6.92 3 7.18 5.9 5.5 7.5a5.52 5.52 0 0 1-1.5-2A3.89 3.89 0 0 0 2 9a4.7 4.7 0 0 0 5 4.5c3.22 0 4.89-2 5-4.5c.13-3-2-6.69-5.85-8.47Z"></path>
					<path d="M9.5 9a2 2 0 0 1-2 2"></path>
				</g>
			</svg>
			<span className="pl-4">Trending</span>
		</Link>,
		<Link to="/trends" className="flex items-center">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="2em"
				height="2em"
				viewBox="0 0 24 24"
			>
				<path
					fill="currentColor"
					d="M12.5 15q1.05 0 1.775-.725T15 12.5V7h2q.425 0 .713-.288T18 6q0-.425-.288-.712T17 5h-2q-.425 0-.712.288T14 6v4.5q-.325-.25-.7-.375T12.5 10q-1.05 0-1.775.725T10 12.5q0 1.05.725 1.775T12.5 15M8 18q-.825 0-1.412-.587T6 16V4q0-.825.588-1.412T8 2h12q.825 0 1.413.588T22 4v12q0 .825-.587 1.413T20 18zm0-2h12V4H8zm-4 6q-.825 0-1.412-.587T2 20V7q0-.425.288-.712T3 6q.425 0 .713.288T4 7v13h13q.425 0 .713.288T18 21q0 .425-.288.713T17 22zM8 4v12z"
				></path>
			</svg>
			<span className="pl-4">Music</span>
		</Link>,
		<Link to="/trends" className="flex items-center">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="2em"
				height="2em"
				viewBox="0 0 512 512"
			>
				<path
					fill="none"
					stroke="currentColor"
					stroke-miterlimit="10"
					stroke-width="32"
					d="M467.51 248.83c-18.4-83.18-45.69-136.24-89.43-149.17A91.5 91.5 0 0 0 352 96c-26.89 0-48.11 16-96 16s-69.15-16-96-16a99.09 99.09 0 0 0-27.2 3.66C89 112.59 61.94 165.7 43.33 248.83c-19 84.91-15.56 152 21.58 164.88c26 9 49.25-9.61 71.27-37c25-31.2 55.79-40.8 119.82-40.8s93.62 9.6 118.66 40.8c22 27.41 46.11 45.79 71.42 37.16c41.02-14.01 40.44-79.13 21.43-165.04Z"
				></path>
				<circle cx="292" cy="224" r="20" fill="currentColor"></circle>
				<path
					fill="currentColor"
					d="M336 288a20 20 0 1 1 20-19.95A20 20 0 0 1 336 288"
				></path>
				<circle cx="336" cy="180" r="20" fill="currentColor"></circle>
				<circle cx="380" cy="224" r="20" fill="currentColor"></circle>
				<path
					fill="none"
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="32"
					d="M160 176v96m48-48h-96"
				></path>
			</svg>
			<span className="pl-4">Video Games</span>
		</Link>,
		<Link to="/live" className="flex items-center">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="2em"
				height="2em"
				viewBox="0 0 24 24"
			>
				<path
					fill="currentColor"
					d="m10.5 17.15l3.98-2.28c.67-.38.67-1.35 0-1.74l-3.98-2.28c-.67-.38-1.5.11-1.5.87v4.55c0 .77.83 1.26 1.5.88M21 6h-7.59l2.94-2.94c.2-.2.2-.51 0-.71s-.51-.2-.71 0L12 5.99L8.36 2.35c-.2-.2-.51-.2-.71 0s-.2.51 0 .71L10.59 6H3a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8a2 2 0 0 0-2-2m-1 14H4c-.55 0-1-.45-1-1V9c0-.55.45-1 1-1h16c.55 0 1 .45 1 1v10c0 .55-.45 1-1 1"
				></path>
			</svg>
			<span className="pl-4">Live</span>
		</Link>,
		<Link to="/trends" className="flex items-center">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="2em"
				height="2em"
				viewBox="0 0 24 24"
			>
				<path
					fill="currentColor"
					d="M17 11h-1a1 1 0 0 0 0 2h1a1 1 0 0 0 0-2m0 4h-1a1 1 0 0 0 0 2h1a1 1 0 0 0 0-2m-6-6h6a1 1 0 0 0 0-2h-6a1 1 0 0 0 0 2m10-6H7a1 1 0 0 0-1 1v3H3a1 1 0 0 0-1 1v10a3 3 0 0 0 3 3h13a4 4 0 0 0 4-4V4a1 1 0 0 0-1-1M6 18a1 1 0 0 1-2 0V9h2Zm14-1a2 2 0 0 1-2 2H7.82A3 3 0 0 0 8 18V5h12Zm-9-4h1a1 1 0 0 0 0-2h-1a1 1 0 0 0 0 2m0 4h1a1 1 0 0 0 0-2h-1a1 1 0 0 0 0 2"
				></path>
			</svg>
			<span className="pl-4">News</span>
		</Link>,
		<Link to="/trends" className="flex items-center">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="2em"
				height="2em"
				viewBox="0 0 24 24"
			>
				<path
					fill="currentColor"
					fillRule="evenodd"
					d="M12 1.25c-1.828 0-3.339.161-4.502.357l-.134.023c-1.01.169-1.85.31-2.507 1.118c-.42.519-.557 1.08-.588 1.705l-.492.164c-.463.154-.87.29-1.191.44c-.348.162-.667.37-.911.709c-.244.338-.341.707-.385 1.088c-.04.353-.04.78-.04 1.269v.145c0 .402 0 .757.03 1.054c.032.321.103.634.28.936c.179.303.417.517.683.701c.245.17.555.343.907.538l2.64 1.467c.54 1.061 1.281 2.007 2.3 2.69c.887.596 1.952.97 3.213 1.069a.748.748 0 0 0-.053.277v1.75H9.82a1.75 1.75 0 0 0-1.716 1.407l-.219 1.093H6a.75.75 0 0 0 0 1.5h12a.75.75 0 0 0 0-1.5h-1.885l-.219-1.093a1.75 1.75 0 0 0-1.716-1.407h-1.43V17a.748.748 0 0 0-.053-.277c1.261-.1 2.326-.473 3.213-1.068c1.02-.684 1.76-1.63 2.3-2.691l2.64-1.467c.352-.195.662-.368.907-.538c.265-.184.504-.398.682-.7c.178-.303.25-.616.281-.937c.03-.297.03-.652.03-1.054v-.145c0-.488 0-.916-.04-1.269c-.044-.381-.14-.75-.385-1.088c-.244-.339-.563-.547-.91-.71c-.323-.15-.729-.285-1.192-.439l-.492-.164c-.03-.626-.167-1.186-.588-1.705c-.656-.809-1.496-.95-2.506-1.118l-.135-.023A27.122 27.122 0 0 0 12 1.25m2.585 20l-.16-.799a.25.25 0 0 0-.245-.201H9.82a.25.25 0 0 0-.245.201l-.16.799zM4.288 6.028l.014-.005c.072 1.52.243 3.2.671 4.77l-1.066-.591c-.389-.217-.633-.353-.809-.475c-.162-.113-.215-.18-.244-.23c-.03-.05-.062-.128-.082-.324a10.58 10.58 0 0 1-.022-.938v-.073c0-.539.001-.88.03-1.138c.028-.238.072-.327.112-.381c.039-.055.109-.125.326-.226c.236-.11.56-.219 1.07-.39m15.41-.005c-.071 1.52-.243 3.2-.67 4.77l1.065-.591c.389-.217.633-.353.809-.475c.162-.113.215-.18.244-.23c.03-.05.062-.128.082-.324c.021-.214.022-.493.022-.938v-.073c0-.539-.001-.88-.03-1.138c-.028-.238-.072-.327-.112-.381c-.039-.055-.109-.125-.326-.226c-.236-.11-.56-.219-1.07-.39zM7.748 3.086A25.626 25.626 0 0 1 12 2.75c1.74 0 3.167.153 4.252.336c1.207.204 1.46.28 1.727.608c.262.322.287.628.233 1.983c-.09 2.258-.388 4.696-1.31 6.55c-.456.914-1.052 1.662-1.827 2.182c-.771.517-1.766.841-3.075.841c-1.309 0-2.303-.324-3.074-.841c-.776-.52-1.372-1.268-1.827-2.183c-.923-1.853-1.22-4.29-1.31-6.55c-.054-1.354-.03-1.66.233-1.982c.266-.328.519-.404 1.726-.608"
					clipRule="evenodd"
				></path>
			</svg>
			<span className="pl-4">Sports</span>
		</Link>,
		<Link to="/trends" className="flex items-center">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="2em"
				height="2em"
				viewBox="0 0 24 24"
			>
				<path
					fill="currentColor"
					d="M12 21.5c-1.35-.85-3.8-1.5-5.5-1.5c-1.65 0-3.35.3-4.75 1.05c-.1.05-.15.05-.25.05c-.25 0-.5-.25-.5-.5V6c.6-.45 1.25-.75 2-1c1.11-.35 2.33-.5 3.5-.5c1.95 0 4.05.4 5.5 1.5c1.45-1.1 3.55-1.5 5.5-1.5c1.17 0 2.39.15 3.5.5c.75.25 1.4.55 2 1v14.6c0 .25-.25.5-.5.5c-.1 0-.15 0-.25-.05c-1.4-.75-3.1-1.05-4.75-1.05c-1.7 0-4.15.65-5.5 1.5m-1-14c-1.36-.6-3.16-1-4.5-1c-1.2 0-2.4.15-3.5.5v11.5c1.1-.35 2.3-.5 3.5-.5c1.34 0 3.14.4 4.5 1zM13 19c1.36-.6 3.16-1 4.5-1c1.2 0 2.4.15 3.5.5V7c-1.1-.35-2.3-.5-3.5-.5c-1.34 0-3.14.4-4.5 1zm1-2.65c.96-.35 2.12-.52 3.5-.52c1.04 0 1.88.08 2.5.24v-1.5a13.884 13.884 0 0 0-6 .19zm0-2.66c.96-.35 2.12-.53 3.5-.53c1.04 0 1.88.08 2.5.24v-1.5c-.87-.16-1.71-.23-2.5-.23c-1.28 0-2.45.15-3.5.45zM14 11c.96-.33 2.12-.5 3.5-.5c.91 0 1.76.09 2.5.28V9.23c-.87-.15-1.71-.23-2.5-.23c-1.32 0-2.5.15-3.5.46z"
				></path>
			</svg>
			<span className="pl-4">Cultivations</span>
		</Link>,
		<Link to="/trends" className="flex items-center">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="2em"
				height="2em"
				viewBox="0 0 24 24"
			>
				<path
					fill="currentColor"
					d="M11 21v-7.275q-.45-.275-.725-.712T10 12q0-.825.588-1.412T12 10q.825 0 1.413.588T14 12q0 .575-.275 1.025t-.725.7V21q0 .425-.288.713T12 22q-.425 0-.712-.288T11 21m-5.175-2.475q-.3.3-.725.3t-.7-.325q-1.125-1.325-1.763-2.975T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 1.875-.638 3.525T19.6 18.5q-.275.325-.687.338t-.713-.288q-.275-.275-.275-.7t.275-.75q.85-1.05 1.325-2.35T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 1.45.475 2.738t1.35 2.337q.275.325.287.738t-.287.712M8.65 15.7q-.3.3-.725.313t-.675-.338q-.575-.775-.913-1.7T6 12q0-2.5 1.75-4.25T12 6q2.5 0 4.25 1.75T18 12q0 1.05-.337 1.988t-.913 1.687q-.25.325-.675.338t-.725-.288q-.275-.275-.287-.7t.237-.775q.325-.5.513-1.062T16 12q0-1.65-1.175-2.825T12 8q-1.65 0-2.825 1.175T8 12q0 .65.188 1.2t.512 1.05q.25.35.238.763t-.288.687"
				></path>
			</svg>
			<span className="pl-4">Podcasts</span>
		</Link>,
		<Link to="/trends" className="flex items-center">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="2em"
				height="2em"
				viewBox="0 0 24 24"
			>
				<path
					fill="currentColor"
					d="m9.675 13.7l.875-2.85L8.25 9h2.85l.9-2.8l.9 2.8h2.85l-2.325 1.85l.875 2.85l-2.3-1.775zM6 23v-7.725q-.95-1.05-1.475-2.4T4 10q0-3.35 2.325-5.675T12 2q3.35 0 5.675 2.325T20 10q0 1.525-.525 2.875T18 15.275V23l-6-2zm6-7q2.5 0 4.25-1.75T18 10q0-2.5-1.75-4.25T12 4Q9.5 4 7.75 5.75T6 10q0 2.5 1.75 4.25T12 16m-4 4.025L12 19l4 1.025v-3.1q-.875.5-1.888.788T12 18q-1.1 0-2.113-.288T8 16.926zm4-1.55"
				></path>
			</svg>
			<span className="pl-4">Premium</span>
		</Link>,
	];
	var divContent1 = [];
	var divContent2 = [];
	var divContent3 = [];
	for (var i = 0; i < 3; i++) {
		var divContent = iconsMenu[i];
		divContent1.push(
			<div className="hover:bg-gray-100 min-w-[100%] flex pl-1 mt-2">
				{divContent}
			</div>
		);
	}
	for (var i = 3; i < 7; i++) {
		var divContent = iconsMenu[i];
		divContent2.push(
			<div className="hover:bg-gray-100 min-w-[100%] flex pl-1 mt-2">
				{divContent}
			</div>
		);
	}
	for (var i = 7; i < iconsMenu.length; i++) {
		var divContent = iconsMenu[i];
		divContent3.push(
			<div className="hover:bg-gray-100 min-w-[100%] flex pl-1 mt-2">
				{divContent}
			</div>
		);
	}

  var [subscribeListInfos, setSubscribeListInfos] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/timeline/subscribe-list-request-menu`,
          {
            withCredentials: true,
          }
        );
        setSubscribeListInfos(response.data);
      } catch (error) {
        console.error("Error fetching subscribe list:", error);
      }
    };
    fetch();
  }, []);

  var menuSub = [];
  for (var i = 0; i < subscribeListInfos.length; i++) {
    var profilePicture = subscribeListInfos[i]["PP"];
    var pseudo = subscribeListInfos[i]["pseudo"];

    menuSub.push(
      <div className="hover:bg-gray-100 min-w-[100%] flex items-center pl-2 mt-1">
        <div className="w-[2em] h-[2em]">
          <img className="rounded-full" src={profilePicture} />
        </div>
        <div className="pl-4">{pseudo}</div>
      </div>
    );
  }

  async function GoToChannel() {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/channel/get-identifier",
        { withCredentials: true }
      );
      const identifier = response.data.identifier_channel;
      window.location.href =
        identifier != null
          ? "http://localhost:3000/channel?identifier=" + identifier
          : "http://localhost:3000/new-channel";
    } catch (error) {
      console.error(
        "An error occurred while searching research most view: ",
        error
      );
    }
  }

  return (
    <>
      <div
        className="HAMBURGER-ICON space-y-2"
        onClick={() => setIsNavOpen((prev) => !prev)} // toggle isNavOpen state on click so the menu will open
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M3 18v-2h18v2zm0-5v-2h18v2zm0-5V6h18v2z"
          ></path>
        </svg>
      </div>
      <div className="overflow-auto">
        <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
          <div
            className="HAMBURGER-ICON space-y-2 flex items-center justify-center"
            onClick={() => setIsNavOpen(false)} // toggle isNavOpen state on click so the menu will close
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M3 18v-2h18v2zm0-5v-2h18v2zm0-5V6h18v2z"
              ></path>
            </svg>
            <div className="flex w-[100%] h-6 ml-2 mt-0.5">
              <img
                className="w-6 h-6 mr-0.5"
                src="favicon.png"
                alt="favicon"
              ></img>
              <p>CODITUBE</p>
            </div>
          </div>
          {divContent1}
          <div className="border-b-2 border-black min-w-[100%] mt-2"></div>
          <div className="hover:bg-gray-100 min-w-[100%] flex space-x-4 items-center-1 mt-1">
            <Link to="/you" className="pl-2">
              You
            </Link>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.5em"
              height="1.5em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="m14 18l-1.4-1.45L16.15 13H4v-2h12.15L12.6 7.45L14 6l6 6z"
              ></path>
            </svg>
          </div>
          {divContent2}
          <div className="border-b-2 border-black min-w-[100%] mt-2"></div>
          <div className="hover:bg-gray-100 min-w-[100%] flex items-center pl-2 mt-1">
            Explore
          </div>
          {divContent3}
          <div className="border-b-2 border-black min-w-[100%] mt-2"></div>
          <div className="hover:bg-gray-100 min-w-[100%] flex items-center pl-2 mt-1">
            Subscription
          </div>
          {menuSub}
        </div>
        <style>{`
      .hideMenuNav {
        display: none;
      }
      .showMenuNav {
        display: block;
        position: fixed;
        width: 15%;
        height: 100vh;
        top: 0;
        left: 0;
        background: white;
        z-index: 14;
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: scroll;
        @media (max-width: 1000px) { width: 100%; z-index: 22;  }
      }
    `}</style>
      </div>
    </>
  );
};

export default DisplayedBurgerMenu;
