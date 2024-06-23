# API to Develop

## User Info

### 1. Get User Info

- **Input**: `userid`
- **Output**:
  ```json
  {
    "username": "string",
    "userid": "string",
    "height": "number",
    "currentweight": "number"
  }
  ```

### 2. Get User Weights

- **Input**: `userid`, `daterange`
- **Output**: List of weights within the specified date range.

### 3. Set User Weight

- **Input**: `userid`, `weight`
- **Output**: Confirmation of weight update.

## Routines

### 1. Get Routines

- **Input**: `userid`
- **Output**:
  ```json
  [
    {
      "name": "Pull day",
      "id": "1",
      "userid": 1,
      "exercises": [
        {
          "name": "Biceps curls",
          "exerciseId": "",
          "sets": 3,
          "reps": 12
        },
        {
          "name": "Triceps curls",
          "exerciseId": "",
          "sets": 3,
          "reps": 12
        }
      ]
    }
  ]
  ```

### 2. Add Routine

- **Input**:

  ```json
  {
    "name": "Pull day",
    "id": "1",
    "userid": 1,
    "exercises": [
      {
        "name": "Biceps curls",
        "exerciseId": "",
        "sets": 3,
        "reps": 12
      },
      {
        "name": "Triceps curls",
        "exerciseId": "",
        "sets": 3,
        "reps": 12
      }
    ]
  }
  ```

- **Output**: Confirmation of routine addition.

### 3. Edit Routine

- **Input**: `routineid`, `userid`, `routine object`
- **Output**: Confirmation of routine update.

### 4. Delete Routine

- **Input**: `routineid`, `userid`
- **Output**: Confirmation of routine deletion.

### 5. Assign Routine to New User

- **Input**: `routineid`, `currentUserid`, `newUserId`
- **Output**: Confirmation of routine assignment.

## Exercises

### 1. Get All Exercises

- **Input**: None
- **Output**: List of all exercises.

### 2. Add Exercise

- **Input**:
  ```json
  {
    "name": "3/4 Sit-Up",
    "force": "pull",
    "level": "beginner",
    "mechanic": "compound",
    "equipment": "body only",
    "primaryMuscles": ["abdominals"],
    "secondaryMuscles": [],
    "instructions": [
      "Lie down on the floor and secure your feet. Your legs should be bent at the knees.",
      "Place your hands behind or to the side of your head. You will begin with your back on the ground. This will be your starting position.",
      "Flex your hips and spine to raise your torso toward your knees.",
      "At the top of the contraction your torso should be perpendicular to the ground. Reverse the motion, going only ¾ of the way down.",
      "Repeat for the recommended amount of repetitions."
    ],
    "category": "strength",
    "images": ["3_4_Sit-Up/0.jpg", "3_4_Sit-Up/1.jpg"],
    "id": "3_4_Sit-Up"
  }
  ```
- **Output**: Confirmation of exercise addition.

## Logs

### 1. Create Logs

- **Input**:
  ```json
  [
    {
      "date": "2024-06-20",
      "userid": 1,
      "routine": "Back biceps",
      "totalweights": 152,
      "totalreps": 12,
      "totalworkout": 3,
      "exercises": [
        {
          "name": "Bicep Curl",
          "sets": [
            { "weight": 20, "reps": 10 },
            { "weight": 22.5, "reps": 8 },
            { "weight": 25, "reps": 6 }
          ]
        },
        {
          "name": "Lat pulldowns",
          "sets": [
            { "weight": 20, "reps": 10 },
            { "weight": 22.5, "reps": 8 },
            { "weight": 25, "reps": 6 }
          ]
        }
      ]
    }
  ]
  ```
- **Output**: Confirmation of log creation.

### 2. Get Logs

- **Endpoint**: `/api/workout-progress/:userid/:workout/:period`
- **Output**:
  ```json
  [
    {
      "date": "2024-06-19T00:00:00.000Z",
      "userid": 1,
      "routine": "Back biceps",
      "totalweights": 70,
      "totalreps": 24,
      "totalworkout": 1,
      "exercises": [
        {
          "name": "Bicep Curl",
          "sets": [
            { "weight": 20, "reps": 10 },
            { "weight": 25, "reps": 8 },
            { "weight": 25, "reps": 6 }
          ]
        }
      ]
    },
    {
      "date": "2024-06-20T00:00:00.000Z",
      "userid": 1,
      "routine": "Back biceps",
      "totalweights": 67.5,
      "totalreps": 24,
      "totalworkout": 1,
      "exercises": [
        {
          "name": "Bicep Curl",
          "sets": [
            { "weight": 20, "reps": 10 },
            { "weight": 22.5, "reps": 8 },
            { "weight": 25, "reps": 6 }
          ]
        }
      ]
    }
  ]
  ```

### 3. Get Specific Routine Logs

- **Endpoint**: `/api/routine-progress/:userid/:routine/:period`
- **Output**:
  ```json
  [
    {
      "date": "2024-06-19T00:00:00.000Z",
      "userid": 1,
      "routine": "Back biceps",
      "totalweights": 140,
      "totalreps": 48,
      "totalworkout": 2,
      "exercises": [
        {
          "name": "Bicep Curl",
          "sets": [
            { "weight": 20, "reps": 10 },
            { "weight": 25, "reps": 8 },
            { "weight": 25, "reps": 6 }
          ]
        },
        {
          "name": "Lat pulldowns",
          "sets": [
            { "weight": 20, "reps": 10 },
            { "weight": 25, "reps": 8 },
            { "weight": 25, "reps": 6 }
          ]
        }
      ]
    },
    {
      "date": "2024-06-20T00:00:00.000Z",
      "userid": 1,
      "routine": "Back biceps",
      "totalweights": 135,
      "totalreps": 48,
      "totalworkout": 2,
      "exercises": [
        {
          "name": "Bicep Curl",
          "sets": [
            { "weight": 20, "reps": 10 },
            { "weight": 22.5, "reps": 8 },
            { "weight": 25, "reps": 6 }
          ]
        },
        {
          "name": "Lat pulldowns",
          "sets": [
            { "weight": 20, "reps": 10 },
            { "weight": 22.5, "reps": 8 },
            { "weight": 25, "reps": 6 }
          ]
        }
      ]
    }
  ]
  ```

## Total Weight Lifted Each Day

### Endpoint

- **GET**: `/api/total-weight/:userid/:period`
- **Output**:
  ```json
  {
    "2024-06-18": 140,
    "2024-06-19": 140,
    "2024-06-20": 135
  }
  ```
