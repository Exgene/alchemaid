/*
 * Todo: rename this file UserData.ts and update all imports
 */

import type { Timestamp } from 'firebase/firestore';
interface Link {
	url: string;
	platform: string;
	title: string;
}

// Immutable Data will be present in user collection
interface ImmutableData {
	username: string;
	name: string;
	email: string;
	isDoctor: boolean;
	verifiedCertificates: string[];
	[dynamicField: string]: unknown;
}

// Mutable Data will be present in profile collection
interface Certificates {
	certificateID: string;
	certificateTitle: string;
	certificateDescription: string;
	certificateIssueDate?: Timestamp;
	image?: string;
}

type DynamicFields<T> = {
	[K in keyof T as `${string & K}`]: Certificates;
};

interface MutableData {
	usn?: string;
	phone?: string;
	photoURL: string;
	bio: string;
	color_light: string;
	color_dark: string;
	links: Link[];
}

// Intersection of TeamData and DynamicHistoryFields to enforce the structure
export type ProfileData = ImmutableData & DynamicFields<ImmutableData> & MutableData;

interface Report {
	uploadTime: Timestamp;
	title: string;
	id: string;
	description?: string;
	photoURL?: string;
	category: string;
	aiDiagnosis: string;
	doctorDiagnosis: string;
	remarks: string;
}

interface PrivateData {
	name: string;
	phone: string;
	email: string;
	username: string;
	reports: Report[];
}

export type UserPrivateData = PrivateData;
