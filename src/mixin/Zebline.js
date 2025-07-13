const mixinZebline = {
  methods: {
    trackByZebline (eventName, eventData) {
      if (typeof window !== 'undefined') {
        window.zebline.event.track(eventName, [eventData])
      }
    }
  }
}

export default mixinZebline
