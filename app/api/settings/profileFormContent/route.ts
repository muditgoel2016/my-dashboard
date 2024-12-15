// app/api/settings/profile/route.ts
import { NextResponse } from 'next/server'

export interface ProfileFormContent {
  name: string;
  username: string;
  email: string;
  dateOfBirth: string;
  presentAddress: string;
  permanentAddress: string;
  city: string;
  postalCode: string;
  country: string;
  avatarUrl?: string;
}

export async function GET() {
  const profileData: ProfileFormContent = {
    name: "Charlene Reed",
    username: "Charlene Reed",
    email: "charlenereed@gmail.com",
    dateOfBirth: "25 January 1990",
    presentAddress: "San Jose, California, USA",
    permanentAddress: "San Jose, California, USA",
    city: "San Jose",
    postalCode: "45962",
    country: "USA",
    avatarUrl: "https://picsum.photos/id/64/96/96"
  }

  return NextResponse.json(profileData)
}