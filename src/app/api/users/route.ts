// app/api/users/route.ts
import { NextResponse } from 'next/server';
import dummyUsers from '@/data/dummyUsers.json'; // pastikan path sesuai lokasi file JSON

export async function GET() {
  return NextResponse.json(dummyUsers);
}
