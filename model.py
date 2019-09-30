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

    def __init__(self, rid: int, name: str, strength: int) -> None:
        super().__init__()
        self.rid = rid
        self.name = name
        self.strength = strength

    def serialize(self):
        return {
            "id": self.rid,
            "name": self.name,
            "strength": self.strength
        }


@auto_str
class Mission:

    def __init__(self, rid: int, name: str, difficulty: int) -> None:
        super().__init__()
        self.rid = rid
        self.name = name
        self.difficulty = difficulty
        self.running = False
        self.hero_ids = []

    def start(self, hero_ids: []):
        self.hero_ids = hero_ids

    def serialize(self):
        return {
            "id": self.rid,
            "name": self.name,
            "difficulty": self.difficulty,
            "running": self.running,
            "heroes": self.hero_ids
        }
