<?php

namespace Tests\Feature;

use App\Group;
use App\Menu;
use App\Store;
use App\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class MenusTest extends TestCase
{
    use RefreshDatabase;

    protected $master;

    protected $member;

    protected $anotherMember;

    protected $outsider;

    protected $group;

    protected $store;

    protected $menuForm;

    protected function setUp(): void
    {
        parent::setUp(); // TODO: Change the autogenerated stub

        $this->master = factory(User::class)->create();

        $this->member = factory(User::class)->create();

        $this->anotherMember = factory(User::class)->create();

        $this->outsider = factory(User::class)->create();

        $this->group = factory(Group::class)->create();

        $this->group->users()->attach($this->master, ["master" => true]);

        $this->group->users()->attach($this->member);

        $this->group->users()->attach($this->anotherMember);

        $this->store = factory(Store::class)->create(["group_id" => $this->group->id]);

        $this->menuForm = [
            "store_id" => $this->store->id,
            "title" => "test",
            "body" => "test",
            "price" => 2000,
        ];

        $this->actingAs($this->member);
    }

    /** @test */
    function 그룹원은_메뉴를_등록할_수_있다()
    {
        $this->post("/api/menus", $this->menuForm)->assertStatus(201);

        $this->assertCount(1, $this->store->menus);
    }

    /** @test */
    function 한_음식점에_최대_메뉴_개수는_50개까지만_등록_가능하다()
    {
        $menuMaxCount = 50;

        factory(Menu::class, $menuMaxCount)->create([
            "store_id" => $this->store->id
        ]);

        $this->post("/api/menus", $this->menuForm)->assertStatus(403);
    }

    /** @test */
    function 그룹원은_음식점의_메뉴를_볼_수_있다()
    {
        $menuCount = 3;

        factory(Menu::class, $menuCount)->create([
            "store_id" => $this->store->id
        ]);

        $menus = $this->json("get", "/api/menus", ["store_id" => $this->store->id])->decodeResponseJson("data");

        $this->assertCount($menuCount, $menus);

        $this->actingAs($this->outsider);

        $this->json("get", "/api/menus", ["store_id" => $this->store->id])->assertStatus(401);
    }

    /** @test */
    function 그룹원은_메뉴를_수정할_수_있다()
    {
        $updateTitle = "수정";

        $menu = factory(Menu::class)->create([
            "store_id" => $this->store->id
        ]);


        $menu->title = $updateTitle;

        $updatedMenu = $this->patch("/api/menus/".$menu->id, [
            "title" => $updateTitle,
            "price" => $menu->price
        ])->decodeResponseJson("data");

        $this->assertEquals($updatedMenu["title"], $updateTitle);
    }

    /** @test */
    function 그룹원은_메뉴를_삭제할_수_있다()
    {
        $menu = factory(Menu::class)->create([
            "store_id" => $this->store->id
        ]);

        $this->delete("/api/menus/".$menu->id);

        $this->assertCount(0, $this->store->menus);
    }


}
