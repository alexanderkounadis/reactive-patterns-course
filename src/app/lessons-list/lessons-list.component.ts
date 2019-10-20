import { Component } from '@angular/core';
import { globalEventBus, Observer, LESSONS_LIST_AVAILABLE, ADD_NEW_LESSON } from 'app/event-bus-experiments/event-bus';
import { Lesson } from 'app/shared/model/lesson';
import * as _ from 'lodash';

@Component({
  selector: 'lessons-list',
  templateUrl: './lessons-list.component.html',
  styleUrls: ['./lessons-list.component.css']
})
export class LessonsListComponent implements Observer {
lessons: Lesson[] = [];

// bad practice - caring about timing issues constructor < broadcasting so register before data
// is available
  constructor() { 
    console.log('lessons list component is registered as observer...');
    globalEventBus.registerObserver(LESSONS_LIST_AVAILABLE, this);

    globalEventBus.registerObserver(ADD_NEW_LESSON, {
      notify: lessonText=> {
        this.lessons.push({
          id: Math.random(),
          description: lessonText
        })
      }
    });
  }

  // ngOnInit() {
  //   console.log('lessons list component is registered as observer...');
  //   globalEventBus.registerObserver(this);
  // }

  notify(data: Lesson[]) {
    console.log('Lessons list component received data');
    this.lessons = data;
  }

  toggleLessonViewed(lesson: Lesson) {
    console.log('toggling lesson...');
    lesson.completed = !lesson.completed;
  }

  delete(lesson) {
    _.remove(this.lessons, lesson => lesson.id === lesson.id);
  }
}
