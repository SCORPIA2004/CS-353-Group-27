import { Goal } from '@/enum/goal.enum';

export function makeSuggestion(goal_difference: number, days_left: number, goal_type: any) {
  let suggestion = "";

  switch (goal_type) {
    case Goal.WEIGHT_LOSS:
      if (goal_difference >= 95) {
        suggestion = "Congratulations! You're almost there! Focus on maintaining a balanced diet and staying hydrated.";
      } else if (goal_difference >= 85) {
        suggestion = "You're very close to reaching your goal! Try to stay consistent and avoid high-calorie snacks.";
      } else if (goal_difference >= 70) {
        suggestion = "You're making good progress! Consider adding some high-intensity interval training (HIIT) to your workouts.";
      } else if (goal_difference >= 50) {
        suggestion = "You're halfway there! Focus on portion control and reducing processed foods in your diet.";
      } else {
        suggestion = "Keep pushing! Try incorporating more whole foods and increasing your physical activity.";
      }
      break;
    case Goal.MUSCLE_GAIN:
      if (goal_difference >= 95) {
        suggestion = "Well done! Focus on maintaining proper nutrition and getting enough rest for optimal muscle growth.";
      } else if (goal_difference >= 85) {
        suggestion = "You're very close to your goal! Consider increasing your protein intake and varying your workout routine.";
      } else if (goal_difference >= 70) {
        suggestion = "You're making good progress! Focus on progressive overload and ensuring proper recovery between workouts.";
      } else if (goal_difference >= 50) {
        suggestion = "You're halfway there! Try incorporating compound exercises and increasing your workout volume.";
      } else {
        suggestion = "Keep pushing! Ensure you're consuming enough calories and protein to support muscle growth.";
      }
      break;
    case Goal.CARDIO:
      if (goal_difference >= 95) {
        suggestion = "Fantastic job! Consider challenging yourself with longer or more intense cardio sessions.";
      } else if (goal_difference >= 85) {
        suggestion = "You're very close to reaching your cardio goal! Try adding some high-intensity intervals to your workouts.";
      } else if (goal_difference >= 70) {
        suggestion = "You're doing well! Keep pushing yourself to increase your endurance and stamina.";
      } else if (goal_difference >= 50) {
        suggestion = "You're halfway there! Try mixing up your cardio routine with different activities.";
      } else {
        suggestion = "Keep going! Consistency is key, aim to gradually increase your cardio duration and intensity.";
      }
      break;
    case Goal.STRENGTH:
      if (goal_difference >= 95) {
        suggestion = "Impressive work! Consider increasing the weight or difficulty of your strength training exercises.";
      } else if (goal_difference >= 85) {
        suggestion = "You're very close to your strength goal! Focus on proper form and challenging yourself in each workout.";
      } else if (goal_difference >= 70) {
        suggestion = "You're making great progress! Ensure you're giving each muscle group enough attention and recovery time.";
      } else if (goal_difference >= 50) {
        suggestion = "You're halfway there! Try adding some new exercises or increasing your weights.";
      } else {
        suggestion = "Keep pushing! Consistency and progressive overload are key to achieving your strength goals.";
      }
      break;
    case Goal.FLEXIBILITY:
      if (goal_difference >= 95) {
        suggestion = "Well done! Maintain your flexibility by incorporating regular stretching into your routine.";
      } else if (goal_difference >= 85) {
        suggestion = "You're very close to reaching your flexibility goal! Focus on deep stretches and yoga.";
      } else if (goal_difference >= 70) {
        suggestion = "You're making progress! Try incorporating dynamic stretches and foam rolling.";
      } else if (goal_difference >= 50) {
        suggestion = "You're halfway there! Focus on stretching all major muscle groups regularly.";
      } else {
        suggestion = "Keep at it! Consistent stretching and mobility work will help improve your flexibility over time.";
      }
      break;
    default:
      suggestion = "Keep up the good work!";
  }

  if (days_left <= 3) {
    suggestion += " Also, with only " + days_left + " days left, make sure to stay focused and consistent!";
  }

  return suggestion;
}
