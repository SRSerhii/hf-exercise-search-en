import type { NextApiRequest, NextApiResponse } from 'next';

type RawExerciseApiResponse = {
  id?: string;
  name?: string;
  target?: string;
  equipment?: string;
  instructions?: string | string[];
  gifUrl?: string;
};

type BackendApiResponse = {
  exercises: RawExerciseApiResponse[];
  totalCount: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<BackendApiResponse | { message: string; details?: string }>
) {
  const RAPIDAPI_HOST = 'exercisedb.p.rapidapi.com';
  const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;

  if (!RAPIDAPI_KEY) {
    return res.status(500).json({ message: 'API key not configured.' });
  }

  const { name, muscleGroup, equipment, page } = req.query;

  const PAGE_SIZE = 30; 
  const currentPage = parseInt(page as string) || 1;
  const offset = (currentPage - 1) * PAGE_SIZE;
  const FETCH_ALL_LIMIT = 10000;

  try {
    let apiUrl: string;

    if (name) {
      apiUrl = `https://${RAPIDAPI_HOST}/exercises/name/${encodeURIComponent(name as string)}?limit=${FETCH_ALL_LIMIT}`;
    } else if (muscleGroup) {
      apiUrl = `https://${RAPIDAPI_HOST}/exercises/target/${encodeURIComponent(muscleGroup as string)}?limit=${FETCH_ALL_LIMIT}`;
    } else if (equipment) {
      apiUrl = `https://${RAPIDAPI_HOST}/exercises/equipment/${encodeURIComponent(equipment as string)}?limit=${FETCH_ALL_LIMIT}`;
    } else {
      apiUrl = `https://${RAPIDAPI_HOST}/exercises?limit=${FETCH_ALL_LIMIT}`;
    }

    console.log('Fetching from:', apiUrl, 'with key:', RAPIDAPI_KEY ? 'present' : 'missing');

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Host': RAPIDAPI_HOST,
        'X-RapidAPI-Key': RAPIDAPI_KEY,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`External API Error (Status: ${response.status}):`, errorText);
      throw new Error(`Failed to fetch from external API: ${response.status}`);
    }

    const initialExercises: RawExerciseApiResponse[] = await response.json();

    const fullyFilteredExercises = initialExercises.filter(exercise => {
      const nameMatch = name
        ? exercise.name?.toLowerCase().includes((name as string).toLowerCase())
        : true;
      const muscleMatch = muscleGroup
        ? exercise.target?.toLowerCase() === (muscleGroup as string).toLowerCase()
        : true;
      const equipMatch = equipment
        ? exercise.equipment?.toLowerCase() === (equipment as string).toLowerCase()
        : true;
      
      return nameMatch && muscleMatch && equipMatch;
    });

    const totalCount = fullyFilteredExercises.length;
    const paginatedExercises = fullyFilteredExercises.slice(offset, offset + PAGE_SIZE);

    res.status(200).json({
      exercises: paginatedExercises,
      totalCount: totalCount,
    });

} catch (error) {
    let errorMessage = 'An unknown error occurred';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.error('API Route Error:', errorMessage);
    res.status(500).json({ message: 'Internal server error', details: errorMessage });
  }
}