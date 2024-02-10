from ninja import Router
from .models import Monster


router = Router()


@router.get("/")
def list_monsters(request):
    monsters = Monster.objects.all()
    return monsters


@router.post("/")
def create_monster(
    request, name: str, level: int, health: int, attack: int, description: str
):
    monster = Monster.objects.create(
        name=name, level=level, health=health, attack=attack, description=description
    )
    return monster


@router.get("/{monster_id}")
def get_monster(request, monster_id: int):
    monster = Monster.objects.get(id=monster_id)
    return monster


@router.put("/{monster_id}")
def update_monster(
    request,
    monster_id: int,
    name: str,
    level: int,
    health: int,
    attack: int,
    description: str,
):
    monster = Monster.objects.get(id=monster_id)
    monster.name = name
    monster.level = level
    monster.health = health
    monster.attack = attack
    monster.description = description
    monster.save()
    return monster


@router.delete("/{monster_id}")
def delete_monster(request, monster_id: int):
    monster = Monster.objects.get(id=monster_id)
    monster.delete()
    return {"message": "Monster deleted successfully"}
