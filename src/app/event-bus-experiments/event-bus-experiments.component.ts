import { Component, OnInit } from '@angular/core';
import { globalEventBus, LESSONS_LIST_AVAILABLE, ADD_NEW_LESSON } from './event-bus';
import { testLessons } from 'app/shared/model/test-lesson';
import { Lesson } from 'app/shared/model/lesson';

@Component({
  selector: 'event-bus-experiments',
  templateUrl: './event-bus-experiments.component.html',
  styleUrls: ['./event-bus-experiments.component.css']
})
export class EventBusExperimentsComponent implements OnInit {
  lessons: Lesson[] = [];
  constructor() { }

  ngOnInit() {
    console.log('Top level component broadcasted all lessons...');

    // keep a copy of test lessons locally
    this.lessons = testLessons.slice(0);

    // pass a copy of lessons array (local reference)
    globalEventBus.notifyObservers(LESSONS_LIST_AVAILABLE, this.lessons);

    setTimeout(() => {
      console.log('this is when new lesson arrived from the backend...');
      this.lessons.push({
        id: Math.random(),
        description: 'New lesson arrived from the backend'
      });
       globalEventBus.notifyObservers(LESSONS_LIST_AVAILABLE, this.lessons);
    }, 10000);
  }

  addLesson(lessonText: string) {
    globalEventBus.notifyObservers(ADD_NEW_LESSON, lessonText);
  }

}
