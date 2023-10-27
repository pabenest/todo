import { type EntitySubscriberInterface, EventSubscriber, type RemoveEvent } from "typeorm";

import { UnexpectedRepositoryError } from "../../../common/error";
import { StateTodo } from "../entity/StateTodo";
import { Todo } from "../entity/Todo";

@EventSubscriber()
export class StateTodoSubscriber implements EntitySubscriberInterface<StateTodo> {
  public listenTo() {
    return StateTodo;
  }

  public async beforeRemove(event: RemoveEvent<StateTodo>): Promise<void> {
    if (event.entity?.isDefault) {
      throw new StateTodoCantDeleteDefaultError("Cannot remove default state");
    }

    const stateTodoRepo = event.connection.getRepository(StateTodo);
    const todoRepo = event.connection.getRepository(Todo);
    if (event.entity?.todos.length) {
      // change todos with default state instead
      const defaultState = await stateTodoRepo.findOneByOrFail({ isDefault: true });
      await todoRepo.update(
        event.entity.todos.map(todo => todo.id),
        { state: defaultState },
      );
    }
  }
}

export class StateTodoCantDeleteDefaultError extends UnexpectedRepositoryError {
  name = "StateTodoCantDeleteDefaultError";
}
