from ninja import Router
from .models import Monster
from .serializers import MonsterSerializer
from .schemas import MonsterSchema, MonsterImageSchema, MonsterAttackSchema


router = Router()


@router.get("/")
def list_monsters(request):
    monsters = Monster.objects.all().prefetch_related("attacks", "images")
    return MonsterSerializer(monsters, many=True).data


@router.post("/")
def create_monster(
    request,
    monster_data: MonsterSchema,
):
    serializer = MonsterSerializer(data=monster_data.dict())
    serializer.is_valid(raise_exception=True)
    monster: Monster = serializer.save()
    return MonsterSerializer(monster).data


@router.get("/{monster_id}")
def get_monster(request, monster_id: int):
    monster = (
        Monster.objects.filter(id=monster_id)
        .prefetch_related("attacks", "images")
        .first()
    )
    return MonsterSerializer(monster).data


@router.put("/{monster_id}")
def update_monster(request, monster_id: int, monster_data: MonsterSchema):
    serializer = MonsterSerializer(data=monster_data.dict())
    serializer.is_valid(raise_exception=True)
    monster: Monster = serializer.save()
    return MonsterSerializer(monster).data


@router.delete("/{monster_id}")
def delete_monster(request, monster_id: int):
    monster = Monster.objects.get(id=monster_id)
    monster_info = {"monster_id": monster.id, "monster_name": monster.name}
    monster.delete()
    return {
        "message": f"Monster {monster_info['monster_id']} ({monster_info['monster_name']}) deleted successfully"
    }
