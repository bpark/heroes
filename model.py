import time


def auto_str(cls):
    def __str__(self):
        return '%s(%s)' % (
            type(self).__name__,
            ', '.join('%s=%s' % item for item in vars(self).items())
        )

    cls.__str__ = __str__
    return cls


@auto_str
class Hero:
    _id_c = 0

    def __init__(self, name: str, strength: int) -> None:
        super().__init__()
        self.rid = Hero._id_c
        self.name = name
        self.strength = strength
        self.mission_id = None
        Hero._id_c += 1

    def set_mission(self, mission_id: int):
        self.mission_id = mission_id

    def serialize(self):
        return {
            "id": self.rid,
            "name": self.name,
            "strength": self.strength
        }


@auto_str
class Mission:
    _id_c = 0

    def __init__(self, name: str, difficulty: int, duration: int, expires: int) -> None:
        super().__init__()
        self.rid = Mission._id_c
        self.name = name
        self.difficulty = difficulty
        self.running = False
        self.hero_ids = []
        self.duration = duration
        self.expires = expires
        self.finish = None
        self.slots = 3
        Mission._id_c += 1

    def start(self, hero_ids: []):
        self.hero_ids = hero_ids
        self.finish = time.time() + self.duration
        self.expires = None

    def serialize(self):
        return {
            "id": self.rid,
            "name": self.name,
            "difficulty": self.difficulty,
            "running": self.running,
            "expires": self.expires,
            "duration": self.duration,
            "slots": self.slots,
            "heroes": self.hero_ids
        }
