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
  bodyPart?: string;
  gifUrl?: string;
}

interface BackendApiResponse {
  exercises: RawExerciseApiResponse[];
  totalCount: number;
}


const mockExercises: Exercise[] = [
  {
    id: "push-up-1",
    name: "Push-up",
    muscleGroup: "Chest",
    equipment: "None",
    instructions: "Start in a plank position with your hands slightly wider than shoulder-width apart. Lower your body until your chest nearly touches the floor, keeping your body in a straight line. Push back up to the starting position."
  } as Exercise,
  {
    id: "squat-2",
    name: "Squat",
    muscleGroup: "Legs",
    equipment: "None",
    instructions: "Stand with your feet shoulder-width apart. Lower your hips as if sitting back into a chair, keeping your chest up and back straight. Go as deep as comfortable, then return to the starting position."
  } as Exercise,
  {
    id: "dumbbell-curl-3",
    name: "Dumbbell Curl",
    muscleGroup: "Biceps",
    equipment: "Dumbbell",
    instructions: "Hold a dumbbell in each hand, palms facing forward. Keep your elbows close to your torso. Curl the dumbbells up towards your shoulders, squeezing your biceps at the top. Slowly lower back to the start."
  } as Exercise,
  {
    id: "bench-press-4",
    name: "Bench Press",
    muscleGroup: "Chest",
    equipment: "Barbell",
    instructions: "Lie on a flat bench with your feet flat on the floor. Grip the barbell slightly wider than shoulder-width. Lower the barbell to your mid-chest, then press it back up until your arms are fully extended."
  } as Exercise,
  {
    id: "pull-up-5",
    name: "Pull-up",
    muscleGroup: "Back",
    equipment: "Pull-up Bar",
    instructions: "Hang from a pull-up bar with an overhand grip, hands shoulder-width apart. Pull your body up towards the bar until your chin clears it. Slowly lower back to the starting position with controlled movement."
  } as Exercise,
  {
    id: "lunge-6",
    name: "Lunge",
    muscleGroup: "Legs",
    equipment: "None",
    instructions: "Step forward with one leg, lowering your hips until both knees are bent at approximately a 90-degree angle. Ensure your front knee is directly above your ankle and your back knee hovers just above the floor. Push off your front foot to return to the start."
  } as Exercise,
  {
    id: "overhead-press-7",
    name: "Overhead Press",
    muscleGroup: "Shoulders",
    equipment: "Barbell",
    instructions: "Stand with your feet shoulder-width apart, holding a barbell at shoulder height with an overhand grip. Press the barbell directly overhead until your arms are fully extended. Lower the barbell back to shoulder height with control."
  } as Exercise,
  {
    id: "triceps-extension-8",
    name: "Triceps Extension",
    muscleGroup: "Triceps",
    equipment: "Dumbbell",
    instructions: "Sit or stand, holding a dumbbell with both hands above your head. Keeping your elbows pointed forward, lower the dumbbell behind your head by bending your elbows. Extend your arms to push the dumbbell back up."
  } as Exercise,
  {
    id: "plank-9",
    name: "Plank",
    muscleGroup: "Core",
    equipment: "None",
    instructions: "Start in a push-up position, then bend your elbows and rest your weight on your forearms. Your body should form a straight line from your head to your heels. Hold this position, engaging your core muscles."
  } as Exercise,
  {
    id: "deadlift-10",
    name: "Deadlift",
    muscleGroup: "Back",
    equipment: "Barbell",
    instructions: "Stand with your feet hip-width apart, the barbell over your midfoot. Hinge at your hips and bend your knees to grip the barbell. Keeping your back straight, lift the weight by extending your hips and knees simultaneously. Lower the weight with control."
  } as Exercise,
  {
    id: "leg-press-11",
    name: "Leg Press",
    muscleGroup: "Legs",
    equipment: "Leg Press Machine",
    instructions: "Sit on the leg press machine with your feet shoulder-width apart on the platform. Lower the platform towards you by bending your knees, then push it back up to the starting position, extending your legs but not locking your knees."
  } as Exercise,
  {
    id: "cable-row-12",
    name: "Cable Row",
    muscleGroup: "Back",
    equipment: "Cable Machine",
    instructions: "Sit at a cable row machine with your feet on the foot platform. Lean forward to grab the handle. Pull the handle towards your lower abdomen, squeezing your shoulder blades together. Slowly release the handle back to the starting position."
  } as Exercise,
];


function ExerciseSearch() {
  const [exerciseName, setExerciseName] = useState('');
  const [muscleGroup, setMuscleGroup] = useState('');
  const [equipment, setEquipment] = useState('');
  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([]);
  const [dataSource, setDataSource] = useState('mock');
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [lastApiSearchParams, setLastApiSearchParams] = useState({
    name: '',
    muscleGroup: '',
    equipment: '',
  });

  const muscleGroupOptions = [
    "",
    "abductors",
    "abs",
    "adductors",
    "biceps",
    "calves",
    "cardiovascular system",
    "delts",
    "forearms",
    "glutes",
    "hamstrings",
    "lats",
    "levator scapulae",
    "pectorals",
    "quads",
    "serratus anterior",
    "spine",
    "traps",
    "triceps",
    "upper back"
  ];

  const equipmentOptions = [
    "",
    "assisted",
    "band",
    "barbell",
    "body weight",
    "bosu ball",
    "cable",
    "dumbbell",
    "elliptical machine",
    "ez barbell",
    "hammer",
    "kettlebell",
    "leverage machine",
    "medicine ball",
    "olympic barbell",
    "resistance band",
    "roller",
    "rope",
    "skierg machine",
    "sled machine",
    "smith machine",
    "stability ball",
    "stationary bike",
    "stepmill machine",
    "tire",
    "trap bar",
    "upper body ergometer",
    "weighted",
    "wheel roller"
  ];

  const PAGE_SIZE = 30;

  const fetchAndFilterExercises = useCallback(async (
    currentName: string,
    currentMuscleGroup: string,
    currentEquipment: string,
    page: number
  ) => {
    setIsLoading(true);
    setFilteredExercises([]);

    if (dataSource === 'mock') {
      const lowerCaseName = currentName.toLowerCase();
      const lowerCaseMuscleGroup = currentMuscleGroup.toLowerCase();
      const lowerCaseEquipment = currentEquipment.toLowerCase();

      const allMockResults = mockExercises.filter(exercise => {
        const nameMatch = exercise.name.toLowerCase().includes(lowerCaseName);
        const muscleGroupMatch = currentMuscleGroup === "" || exercise.muscleGroup.toLowerCase() === lowerCaseMuscleGroup;
        const equipmentMatch = currentEquipment === "" || exercise.equipment.toLowerCase() === lowerCaseEquipment;
        return nameMatch && muscleGroupMatch && equipmentMatch;
      });

      const totalMockPages = Math.ceil(allMockResults.length / PAGE_SIZE);
      setTotalPages(totalMockPages === 0 ? 1 : totalMockPages);
      const startIndex = (page - 1) * PAGE_SIZE;
      const endIndex = startIndex + PAGE_SIZE;
      setFilteredExercises(allMockResults.slice(startIndex, endIndex));
      setIsLoading(false);

    } else {
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
          const name = apiExercise.name || 'Unnamed Exercise';
          const muscleGroup = apiExercise.target || 'N/A';
          const equipment = apiExercise.equipment || 'N/A';
          const instructions = Array.isArray(apiExercise.instructions) ? apiExercise.instructions.join(' ') : apiExercise.instructions || 'No instructions provided.';
          const id = apiExercise.id || `${name.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

          return {
            id: id,
            name: name,
            muscleGroup: muscleGroup,
            equipment: equipment,
            instructions: instructions,
            gifUrl: apiExercise.gifUrl
          } as Exercise;
        });

        setFilteredExercises(transformedData);

        if (responseData.totalCount !== null) {
          setTotalPages(Math.ceil(responseData.totalCount / PAGE_SIZE));
        } else {
          setTotalPages(apiData.length > 0 ? currentPage : 1);
        }

      } catch (error) {
        console.error('Network or parsing error:', error);
        setFilteredExercises([]);
        setTotalPages(1);
      } finally {
        setIsLoading(false);
      }
    }
  }, [dataSource, PAGE_SIZE]);


  useEffect(() => {
    setCurrentPage(1);
    if (dataSource === 'mock') {
      const lowerCaseName = exerciseName.toLowerCase();
      const lowerCaseMuscleGroup = muscleGroup.toLowerCase();
      const lowerCaseEquipment = equipment.toLowerCase();

      const allMockResults = mockExercises.filter(exercise => {
        const nameMatch = exercise.name.toLowerCase().includes(lowerCaseName);
        const muscleGroupMatch = muscleGroup === "" || exercise.muscleGroup.toLowerCase() === lowerCaseMuscleGroup;
        const equipmentMatch = equipment === "" || exercise.equipment.toLowerCase() === lowerCaseEquipment;
        return nameMatch && muscleGroupMatch && equipmentMatch;
      });

      const totalMockPages = Math.ceil(allMockResults.length / PAGE_SIZE);
      setTotalPages(totalMockPages === 0 ? 1 : totalMockPages);
      const startIndex = (0) * PAGE_SIZE;
      const endIndex = startIndex + PAGE_SIZE;
      setFilteredExercises(allMockResults.slice(startIndex, endIndex));
      setIsLoading(false);
    } else {
      setLastApiSearchParams({
        name: exerciseName,
        muscleGroup: muscleGroup,
        equipment: equipment,
      });
      fetchAndFilterExercises(exerciseName, muscleGroup, equipment, 1);
    }
  }, [dataSource]);

  useEffect(() => {
    if (dataSource === 'api') {
      fetchAndFilterExercises(lastApiSearchParams.name, lastApiSearchParams.muscleGroup, lastApiSearchParams.equipment, currentPage);
    } else {
      const lowerCaseName = exerciseName.toLowerCase();
      const lowerCaseMuscleGroup = muscleGroup.toLowerCase();
      const lowerCaseEquipment = equipment.toLowerCase();

      const allMockResults = mockExercises.filter(exercise => {
        const nameMatch = exercise.name.toLowerCase().includes(lowerCaseName);
        const muscleGroupMatch = muscleGroup === "" || exercise.muscleGroup.toLowerCase() === lowerCaseMuscleGroup;
        const equipmentMatch = equipment === "" || exercise.equipment.toLowerCase() === lowerCaseEquipment;
        return nameMatch && muscleGroupMatch && equipmentMatch;
      });

      const totalMockPages = Math.ceil(allMockResults.length / PAGE_SIZE);
      setTotalPages(totalMockPages === 0 ? 1 : totalMockPages);
      const startIndex = (currentPage - 1) * PAGE_SIZE;
      const endIndex = startIndex + PAGE_SIZE;
      setFilteredExercises(allMockResults.slice(startIndex, endIndex));
    }
  }, [currentPage, dataSource, fetchAndFilterExercises]);



  const handleSearch = () => {
    setCurrentPage(1);

    setLastApiSearchParams({
      name: exerciseName,
      muscleGroup: muscleGroup,
      equipment: equipment,
    });

    fetchAndFilterExercises(exerciseName, muscleGroup, equipment, 1);
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

        <div className="mb-6">
          <label htmlFor="dataSource" className="block text-gray-700 text-sm font-medium mb-2">Select Data Source:</label>
          <select
            id="dataSource"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
            value={dataSource}
            onChange={(e) => setDataSource(e.target.value)}
            aria-label="Select data source"
          >
            <option value="mock">Mock Exercises (Local)</option>
            <option value="api">API Exercises (ExerciseDB)</option>
          </select>
        </div>

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

          {/* Muscle Group Dropdown List */}
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

          {/* Equipment Dropdown List */}
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

                  {exercise.gifUrl && dataSource === 'api' ? (
                    <img
                      src={exercise.gifUrl}
                      alt={`GIF of ${exercise.name}`}
                      className="mt-4 w-full h-48 object-contain rounded-lg bg-gray-50 p-2"
                      onError={(e) => {

                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling!.classList.remove('hidden');
                      }}
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
                className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                Previous
              </button>
              <span className="text-gray-700">Page {currentPage} of {totalPages}</span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages || isLoading}
                className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
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
