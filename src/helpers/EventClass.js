import app from '../app';

class EventHandler {

    static async emitEvent(eventName, data) {
        return app.emit(eventName, data);
    }

    static async handleEvent(eventName, data, handler) {

        return app.on(eventName, handler(data));

    }

}

export default EventHandler;