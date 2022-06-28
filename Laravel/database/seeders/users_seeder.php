<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class users_seeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    private $names=["David","Pera"];
    private $emails=["admin@gmail.com","pera@gmail.com"];
    private $pass=['$2y$12$vbCx6zzBuC30pxQi02Ei/Od3T2/IfgQdn958Zk8uWv.PE.qBAP3VG','$2y$12$0i4ZPtLIulU97idRgkpanOxqv46UVo6e2CFbpzIio9GOkkmgG77fG'];
    private $role=[1,2];

    public function run()
    {
        for ($i = 0; $i < count($this->names); $i++) {
            DB::table('users')->insert([
                'name' => $this->names[$i],
                'email' => $this->emails[$i],
                'password' => $this->pass[$i],
                'role_id'=>$this->role[$i],
            ]);
        }
    }
}
