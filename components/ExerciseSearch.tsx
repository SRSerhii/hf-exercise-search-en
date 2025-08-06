"use client";

import React, { useState, useEffect, useCallback } from 'react';

interface Exercise {
  id: string;
  name: string;
  muscleGroup: string;
  equipment: string;
  instructions: string;
  gifUrl?: string;
}

interface RawExerciseApiResponse {
  id?: string;
  name?: string;
  target?: string;
  equipment?: string;
  instructions?: string | string[];
  gifUrl?: string;
}

interface BackendApiResponse {
  exercises: RawExerciseApiResponse[];
  totalCount: number;
}

function ExerciseSearch() {
  const [exerciseName, setExerciseName] = useState('');
  const [muscleGroup, setMuscleGroup] = useState('');
  const [equipment, setEquipment] = useState('');
  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([]);
  
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  const [lastApiSearchParams, setLastApiSearchParams] = useState({
    name: '',
    muscleGroup: '',
    equipment: '',
  });

  const PAGE_SIZE = 30; 

  const muscleGroupOptions = [
    "", "abductors", "abs", "adductors", "biceps", "calves", "cardiovascular system",
    "delts", "forearms", "glutes", "hamstrings", "lats", "levator scapulae",
    "pectorals", "quads", "serratus anterior", "spine", "traps", "triceps", "upper back"
  ];

  const equipmentOptions = [
    "", "assisted", "band", "barbell", "body weight", "bosu ball", "cable",
    "dumbbell", "elliptical machine", "ez barbell", "hammer", "kettlebell",
    "leverage machine", "medicine ball", "olympic barbell", "resistance band",
    "roller", "rope", "skierg machine", "sled machine", "smith machine",
    "stability ball", "stationary bike", "stepmill machine", "tire", "trap bar",
    "upper body ergometer", "weighted", "wheel roller"
  ];

  const fetchApiExercises = useCallback(async (
    currentName: string,
    currentMuscleGroup: string,
    currentEquipment: string,
    page: number
  ) => {
    setIsLoading(true);
    setFilteredExercises([]); 

    try {
      const queryParams = new URLSearchParams();
      if (currentName) queryParams.append('name', currentName);
      if (currentMuscleGroup) queryParams.append('muscleGroup', currentMuscleGroup);
      if (currentEquipment) queryParams.append('equipment', currentEquipment);
      queryParams.append('page', page.toString());

      const response = await fetch(`/api/exercises?${queryParams.toString()}`);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error fetching exercises from API route:', errorData);
        setFilteredExercises([]);
        setTotalPages(1);
        return;
      }

      const responseData: BackendApiResponse = await response.json();
      const apiData: RawExerciseApiResponse[] = responseData.exercises;

      if (!Array.isArray(apiData)) {
        console.error('API response exercises property is not an array:', apiData);
        setFilteredExercises([]);
        setTotalPages(1);
        return;
      }

      const transformedData: Exercise[] = apiData.map((apiExercise: RawExerciseApiResponse) => {
        // Use id if present, otherwise generate a deterministic key from static properties
        const fallbackId = [
          apiExercise.name,
          apiExercise.target,
          apiExercise.equipment
        ].filter(Boolean).join('-').replace(/\s+/g, '-').toLowerCase() || 'unknown-id';

        return {
          id: apiExercise.id || fallbackId,
          name: apiExercise.name || 'Unnamed Exercise',
          muscleGroup: apiExercise.target || 'N/A',
          equipment: apiExercise.equipment || 'N/A',
          instructions: Array.isArray(apiExercise.instructions)
            ? apiExercise.instructions.join(' ')
            : apiExercise.instructions || 'No instructions provided.',
          gifUrl: apiExercise.gifUrl
        };
      });

      setFilteredExercises(transformedData);
      setTotalPages(Math.ceil(responseData.totalCount / PAGE_SIZE));

    } catch (error) {
      console.error('Network or parsing error:', error);
      setFilteredExercises([]);
      setTotalPages(1);
    } finally {
      setIsLoading(false);
    }
  }, [PAGE_SIZE]);

  useEffect(() => {
    handleSearch();
  }, []);

  useEffect(() => {
    if (lastApiSearchParams.name || lastApiSearchParams.muscleGroup || lastApiSearchParams.equipment || currentPage > 1) {
        fetchApiExercises(lastApiSearchParams.name, lastApiSearchParams.muscleGroup, lastApiSearchParams.equipment, currentPage);
    }
  }, [currentPage, fetchApiExercises]);


  const handleSearch = () => {
    setCurrentPage(1); 
    setLastApiSearchParams({ 
      name: exerciseName,
      muscleGroup: muscleGroup,
      equipment: equipment,
    });
    fetchApiExercises(exerciseName, muscleGroup, equipment, 1);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };


  return (
    <div className="min-h-screen p-4 font-sans flex flex-col items-center">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <div className="inline-flex items-center rounded-full border border-green-200 bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
            <span>Free tool</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-clip-text text-transparent bg-gradient-to-r from-green-700 to-green-500">
            Exercise Finder
          </h1>
          <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl/relaxed">
            Discover exercises by name, muscle group, or equipment.
          </p>
        </div>
      </div>

      <div className="w-full max-w-7xl bg-white p-6 rounded-xl shadow-lg mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label htmlFor="exerciseName" className="block text-gray-700 text-sm font-medium mb-2">Exercise Name</label>
            <input
              type="text"
              id="exerciseName"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
              placeholder="e.g., Push-up"
              value={exerciseName}
              onChange={(e) => setExerciseName(e.target.value)}
              aria-label="Search by exercise name"
            />
          </div>

          <div>
            <label htmlFor="muscleGroup" className="block text-gray-700 text-sm font-medium mb-2">Muscle Group</label>
            <select
              id="muscleGroup"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
              value={muscleGroup}
              onChange={(e) => setMuscleGroup(e.target.value)}
              aria-label="Select muscle group"
            >
              {muscleGroupOptions.map(option => (
                <option key={option} value={option}>
                  {option === "" ? "All Muscle Groups" : option.charAt(0).toUpperCase() + option.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="equipment" className="block text-gray-700 text-sm font-medium mb-2">Equipment</label>
            <select
              id="equipment"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
              value={equipment}
              onChange={(e) => setEquipment(e.target.value)}
              aria-label="Select equipment"
            >
              {equipmentOptions.map(option => (
                <option key={option} value={option}>
                  {option === "" ? "All Equipment" : option.charAt(0).toUpperCase() + option.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button onClick={handleSearch} id="exercises-tool-search-1" aria-label="Search exercises" className="w-full rounded-md bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold shadow-lg shadow-green-500/20 h-12 px-8 text-base">
          Search Exercises
        </button>
      </div>

      <div className="w-full max-w-7xl">
        {isLoading ? (
          <p className="text-center text-blue-600 text-lg py-8 animate-pulse">Loading exercises...</p>
        ) : filteredExercises.length === 0 ? (
          <p className="text-center text-gray-600 text-lg py-8">
            No exercises found matching your criteria. Try adjusting your search!
          </p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredExercises.map(exercise => (
                <div key={exercise.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 ease-in-out border border-gray-200">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-2">{exercise.name}</h2>
                  <p className="text-gray-600 text-sm mb-1">
                    <strong className="font-medium">Muscle Group:</strong> {exercise.muscleGroup}
                  </p>
                  <p className="text-gray-600 text-sm mb-3">
                    <strong className="font-medium">Equipment:</strong> {exercise.equipment}
                  </p>
                  {exercise.gifUrl ? (
                    <img
                      src={exercise.gifUrl}
                      alt={`GIF of ${exercise.name}`}
                      className="mt-4 w-full h-48 object-contain rounded-lg bg-gray-50 p-2"
                    />
                  ) : (
                    <p className="text-gray-700 text-base leading-relaxed mt-4">{exercise.instructions}</p>
                  )}
                </div>
              ))}
            </div>
            {/* Pagination Controls */}
            <div className="flex justify-center items-center mt-8 space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1 || isLoading}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                Previous
              </button>
              <span className="text-gray-700">Page {currentPage} of {totalPages}</span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= totalPages || isLoading}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ExerciseSearch;