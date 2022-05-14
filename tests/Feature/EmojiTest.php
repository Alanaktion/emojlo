<?php

namespace Tests\Feature;

use Tests\TestCase;

class EmojiTest extends TestCase
{
    public function test_match_only_emoji()
    {
        $pattern = config('emoji.pattern');
        $this->assertTrue((bool)preg_match($pattern, '🙃'));
        $this->assertTrue((bool)preg_match($pattern, '🙃🍕'));
        $this->assertFalse((bool)preg_match($pattern, 'a'));
        $this->assertFalse((bool)preg_match($pattern, '🙃a'));
        $this->assertFalse((bool)preg_match($pattern, '🙃 '));
        $this->assertFalse((bool)preg_match($pattern, ' 🙃'));
        $this->assertFalse((bool)preg_match($pattern, '🙃 🍕'));
        $this->assertFalse((bool)preg_match($pattern, "🙃\n🍕"));
    }

    public function test_match_emoji_with_whitespace()
    {
        $pattern = config('emoji.pattern_whitespace');
        $this->assertTrue((bool)preg_match($pattern, '🙃'));
        $this->assertTrue((bool)preg_match($pattern, '🙃🍕'));
        $this->assertFalse((bool)preg_match($pattern, 'a'));
        $this->assertFalse((bool)preg_match($pattern, '🙃a'));
        $this->assertTrue((bool)preg_match($pattern, '🙃 '));
        $this->assertTrue((bool)preg_match($pattern, ' 🙃'));
        $this->assertTrue((bool)preg_match($pattern, '🙃 🍕'));
        $this->assertTrue((bool)preg_match($pattern, "🙃\n🍕"));
    }
}
