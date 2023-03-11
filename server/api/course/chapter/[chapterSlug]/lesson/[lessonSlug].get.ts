import course from "~/server/courseData";
import { Lesson, LessonWithPath, Chapter, Course } from "~/types/course";
course as Course;

export default defineEventHandler((event): LessonWithPath => {
  const { chapterSlug, lessonSlug } = event.context.params;
  const chapter: Maybe<Chapter> = course.chapters.find(
    (chapter) => chapter.slug === chapterSlug
  );
  if (!chapter) {
    throw createError({
      statusCode: 404,
      statusMessage: "Chapter not found",
    });
  }

  const lesson: Maybe<Lesson> = chapter.lessons.find(
    (lesson) => (lesson.slug = lessonSlug)
  );
  if (!lesson) {
    throw createError({
      statusCode: 404,
      statusMessage: "Lesson not found",
    });
  }
  return {
    ...lesson,
    path: `/course/chapter/${chapterSlug}/lesson/${lessonSlug}`,
  };
});
